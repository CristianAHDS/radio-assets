const BASE = {
  oficial: 'https://resultados.tse.jus.br',
  simulado: 'https://resultados-sim.tse.jus.br',
};

const AMBIENTES = {
  oficial: 'oficial',
  simulado: 'simulado',
};

const PASTAS = {
  simplificado: 'dados-simplificados',
  unificado: 'dados',
};

const DEFAULTS = {
  ambiente: 'oficial',
  ciclo: 'ele2026',
  eleicao: '',
  uf: 'br',
  cargo: '1',
  municipio: '',
  zona: '',
  formato: 'simplificado',
};

const UF_VALIDA = /^[a-z]{2}$/;
const BR = /^br$/;
const MUNICIPIO = /^\d{1,5}$/;
const ZONA = /^\d{1,4}$/;

const ENTIDADES = {
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&nbsp;': ' ',
};

const decodificar = (texto) =>
  texto
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    )
    .replace(/&[a-z]+;|&#\d+;/gi, (ent) => {
      const chave = ent.toLowerCase();
      return ENTIDADES[chave] !== undefined ? ENTIDADES[chave] : ent;
    })
    .replace(/&amp;/g, '&');

const normalize = (value) =>
  typeof value === 'string'
    ? decodificar(value.replace(/\\\//g, '/')).replace(/\s+/g, ' ').trim()
    : '';

const toNumber = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = Number(value.replace(/\./g, '').replace(',', '.'));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

const pad = (value, size) => String(value).padStart(size, '0');

const toList = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object') return Object.values(value);
  return [];
};

const firstOf = (source, keys) => {
  for (const key of keys) {
    const list = toList(source && source[key]);
    if (list.length > 0) return list;
  }
  return [];
};

const findCargo = (data, codigo) => {
  const cargos = toList(data && data.carg);
  if (cargos.length === 0) return null;
  if (!codigo) return cargos[0];
  return cargos.find((cargo) => String(cargo.cd) === String(codigo)) || cargos[0];
};

const buildFolder = (uf, municipio, zona, formato) => {
  if (formato === PASTAS.unificado) {
    if (zona && municipio) return `${uf}${pad(municipio, 5)}-z${pad(zona, 4)}`;
    if (municipio) return `${uf}${pad(municipio, 5)}`;
    return uf;
  }
  if (municipio) return `${uf}${pad(municipio, 5)}`;
  return uf;
};

const buildUrl = (cfg) => {
  const env = AMBIENTES[cfg.ambiente] || AMBIENTES.oficial;
  const base = BASE[cfg.ambiente] || BASE.oficial;
  const pasta = PASTAS[cfg.formato] || PASTAS.simplificado;
  const uf = BR.test(cfg.uf) ? 'br' : cfg.uf;
  const folder = buildFolder(uf, cfg.municipio, cfg.zona, cfg.formato);
  const sufixo = cfg.formato === PASTAS.unificado ? 'u' : 'r';
  const arquivo = `${folder}-c${pad(cfg.cargo, 4)}-e${pad(cfg.eleicao, 6)}-${sufixo}.json`;
  return `${base}/${env}/${cfg.ciclo}/${cfg.eleicao}/${pasta}/${folder}/${arquivo}`;
};

const fetchWithTimeout = async (url, timeout = 15000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        Accept: 'application/json,text/plain,*/*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      },
    });
  } finally {
    clearTimeout(timer);
  }
};

const extractCandidatos = (data, cargoCodigo) => {
  const cargo = findCargo(data, cargoCodigo) || data;
  const cands = firstOf(cargo, ['cand', 'candidatos']).length
    ? firstOf(cargo, ['cand', 'candidatos'])
    : firstOf(data, ['cand', 'candidatos']);

  return {
    candidatos: cands
      .map((cand) => ({
        numero: toNumber(cand.n),
        nome: normalize(cand.nm) || normalize(cand.nmu) || `Candidato ${cand.n}`,
        votos: toNumber(cand.vap),
        pct: toNumber(cand.pvap),
        eleito: cand.e === 's',
        situacao: normalize(cand.st),
      }))
      .filter((cand) => cand.nome),
    secoesTotais: toNumber(data && data.st),
    secoesApuradas: toNumber(data && data.s),
    votosValidos: toNumber(data && (data.vc !== undefined ? data.vc : data.vv)),
    pctApurado: toNumber(data && data.pst),
    atualizadoEm:
      data && (data.dt || data.dg) && (data.ht || data.hg)
        ? `${data.dt || data.dg} ${data.ht || data.hg}`
        : null,
  };
};

const parseConfig = (event) => {
  const qs = (event && event.queryStringParameters) || {};
  const cfg = { ...DEFAULTS };

  for (const key of Object.keys(DEFAULTS)) {
    const value = qs[key];
    if (typeof value === 'string' && value.trim() !== '') {
      cfg[key] = value.trim().toLowerCase();
    }
  }

  return cfg;
};

export const handler = async (event) => {
  const cfg = parseConfig(event);

  try {
    if (!UF_VALIDA.test(cfg.uf)) {
      throw new Error('Parâmetro "uf" inválido (use "br" ou a sigla da UF)');
    }
    if (cfg.municipio && !MUNICIPIO.test(cfg.municipio)) {
      throw new Error('Parâmetro "municipio" deve conter só dígitos');
    }
    if (cfg.zona && !ZONA.test(cfg.zona)) {
      throw new Error('Parâmetro "zona" deve conter só dígitos');
    }

    const url = buildUrl(cfg);
    const res = await fetchWithTimeout(url);

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: `TSE retornou ${res.status}`,
          hint: 'Verifique ciclo, código da eleição, cargo e formato. Os códigos mudam a cada pleito.',
          source: url,
        }),
      };
    }

    const data = await res.json();
    const resultado = extractCandidatos(data, cfg.cargo);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({
        ...resultado,
        totalVotos: resultado.candidatos.reduce((acc, c) => acc + c.votos, 0),
        fonte: url,
        ambiente: cfg.ambiente,
        uf: cfg.uf,
        cargo: cfg.cargo,
        eleicao: cfg.eleicao,
        atualizadoEm: resultado.atualizadoEm || new Date().toISOString(),
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
