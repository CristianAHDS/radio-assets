import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ARQUIVOS = {
  presidente: 'presidente.txt',
  governador: 'governador.txt',
  senador: 'senador.txt',
  'deputado-federal': 'deputado-federal.txt',
  'deputado-estadual': 'deputado-estadual.txt',
};

const TSE_BASE = 'https://resultados.tse.jus.br';
const TSE_AMBIENTE = 'oficial';
const TSE_CICLO = 'ele2026';

const TSE_CARGOS = {
  presidente: { eleicao: '6257', uf: 'br', cd: 1 },
  governador: { eleicao: '6259', uf: 'rs', cd: 3 },
  senador: { eleicao: '6259', uf: 'rs', cd: 5 },
  'deputado-federal': { eleicao: '6259', uf: 'rs', cd: 6 },
  'deputado-estadual': { eleicao: '6259', uf: 'rs', cd: 7 },
};

const UF = 'RS';
const SITE = 'https://ahoradosul.com.br/wp-admin/admin-ajax.php';
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

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

const decodificarEntidades = (texto) =>
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

const normalizar = (texto) =>
  decodificarEntidades(String(texto || '').replace(/\\\//g, '/'))
    .replace(/\s+/g, ' ')
    .trim();

const primeiraTag = (bloco, regex) => {
  const match = bloco.match(regex);
  return match ? normalizar(match[1]) : null;
};

const paraNumero = (texto) => {
  if (texto === undefined || texto === null || texto === '') return 0;
  const n = Number(String(texto).replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
};

const toList = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object') return Object.values(value);
  return [];
};

const urlTse = ({ eleicao, uf, cd }) => {
  const c = String(cd).padStart(4, '0');
  const e = String(eleicao).padStart(6, '0');
  return `${TSE_BASE}/${TSE_AMBIENTE}/${TSE_CICLO}/${eleicao}/dados/${uf}/${uf}-c${c}-e${e}-u.json`;
};

const urlFotoTse = (cargo, sqcand) => {
  const { eleicao, uf } = TSE_CARGOS[cargo];
  return `${TSE_BASE}/${TSE_AMBIENTE}/${TSE_CICLO}/${eleicao}/fotos/${uf}/${sqcand}.jpeg`;
};

const extrairCandidatosTse = (data, cargo) => {
  const info = TSE_CARGOS[cargo];
  const cargos = toList(data && data.carg);
  const cargoDados =
    cargos.find((c) => Number(c.cd) === info.cd) || cargos[0] || {};
  const candidatos = [];

  for (const agr of toList(cargoDados.agr)) {
    for (const par of toList(agr.par)) {
      const sigla = normalizar(par.sg);
      for (const cand of toList(par.cand)) {
        const nome = normalizar(cand.nmu) || normalizar(cand.nm);
        if (!nome) continue;
        candidatos.push({
          numero: paraNumero(cand.n),
          nome,
          partido: sigla || normalizar(cand.sg) || null,
          numeroPartido: paraNumero(cand.n),
          foto: cand.sqcand ? urlFotoTse(cargo, cand.sqcand) : null,
          percentual:
            cand.pvap !== undefined && cand.pvap !== null
              ? `${String(cand.pvap).replace('.', ',')}%`
              : null,
          pct: paraNumero(cand.pvap),
          votos: `${paraNumero(cand.vap).toLocaleString('pt-BR')} votos`,
          votosNumero: paraNumero(cand.vap),
          eleito: cand.e === 's',
          situacao: normalizar(cand.st),
        });
      }
    }
  }

  const s = (data && data.s) || {};
  const v = (data && data.v) || {};

  return {
    candidatos,
    secoesApuradas: paraNumero(s.pst),
    secoesTotais: paraNumero(s.ts),
    votosValidos: paraNumero(v.vv !== undefined ? v.vv : v.vc),
    pctApurado: paraNumero(s.pst),
    atualizadoEm:
      data && (data.dg || data.hg)
        ? `${data.dg || ''} ${data.hg || ''}`.trim()
        : null,
  };
};

const extrairCandidatos = (html) => {
  const blocos = html.split('<div class="eleicoes-candidato">').slice(1);

  return blocos
    .map((bloco) => {
      const nome = primeiraTag(bloco, /eleicoes-candidato__nome">([^<]*)</);
      if (!nome) return null;

      const foto = primeiraTag(bloco, /<img[^>]+src="([^"]+)"/);
      const partido = primeiraTag(
        bloco,
        /eleicoes-candidato__partido">\s*([\s\S]*?)\s*</,
      );
      const percentual = primeiraTag(
        bloco,
        /eleicoes-candidato__percent">([^<]*)</,
      );
      const votos = primeiraTag(
        bloco,
        /eleicoes-candidato__votos">\s*([\s\S]*?)\s*</,
      );
      const barra = primeiraTag(
        bloco,
        /eleicoes-candidato__barra"\s*style="width:([\d.,]+)%/,
      );

      const numeroPartido = partido && partido.match(/(\d+)\s*$/);

      return {
        nome,
        partido,
        numeroPartido: numeroPartido ? Number(numeroPartido[1]) : null,
        foto,
        percentual,
        pct: paraNumero(percentual),
        votos: votos ? votos.replace(/\s*votos?$/i, '').trim() : null,
        votosNumero: paraNumero(votos ? votos.replace(/\s*votos?$/i, '') : null),
        barra: paraNumero(barra),
      };
    })
    .filter(Boolean);
};

const urlSite = (cargo) => {
  const base = `${SITE}?action=eleicoes_resultado&cargo=${encodeURIComponent(cargo)}&turno=1`;
  return cargo === 'presidente' ? base : `${base}&estado=${UF}`;
};

const fetchWithTimeout = async (url, timeout = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/json,text/plain,*/*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
        'X-Requested-With': 'XMLHttpRequest',
        Referer: 'https://ahoradosul.com.br/apuracao-eleicoes-2026/',
      },
    });
  } finally {
    clearTimeout(timer);
  }
};

const lerArquivo = async (arquivo) => {
  const caminho = join(process.cwd(), 'public', arquivo);
  return JSON.parse(await readFile(caminho, 'utf8'));
};

const validar = (json) => {
  if (!json || !json.success || typeof json.data !== 'string') {
    throw new Error('Formato de dados inesperado');
  }
  return json;
};

const obterTse = async (cargo) => {
  try {
    const res = await fetchWithTimeout(urlTse(TSE_CARGOS[cargo]));
    if (!res.ok) return null;
    const resultado = extrairCandidatosTse(await res.json(), cargo);
    return resultado.candidatos.length > 0 ? resultado : null;
  } catch {
    return null;
  }
};

const obterSiteOuArquivo = async (cargo, arquivo) => {
  try {
    const res = await fetchWithTimeout(urlSite(cargo));
    if (res.ok) {
      return { json: validar(await res.json()), fonte: 'site' };
    }
  } catch {
    // usa o arquivo estático como fallback
  }
  return { json: validar(await lerArquivo(arquivo)), fonte: 'arquivo' };
};

const responder = (payload) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(payload),
});

export const handler = async (event) => {
  const qs = (event && event.queryStringParameters) || {};
  const cargo = String(qs.cargo || 'presidente').trim().toLowerCase();
  const arquivo = ARQUIVOS[cargo];

  if (!arquivo) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: `Cargo "${cargo}" inválido`,
        disponiveis: Object.keys(ARQUIVOS),
      }),
    };
  }

  try {
    const tse = await obterTse(cargo);
    if (tse) {
      return responder({
        cargo,
        fonte: 'tse',
        total: tse.candidatos.length,
        ...tse,
      });
    }

    const { json, fonte } = await obterSiteOuArquivo(cargo, arquivo);
    const candidatos = extrairCandidatos(json.data);
    const secoes = json.data.match(
      /eleicoes-apuracao__secoes[^>]*>\s*([\d.,]+)\s*</,
    );

    return responder({
      cargo,
      fonte,
      secoesApuradas: secoes ? paraNumero(secoes[1]) : null,
      total: candidatos.length,
      candidatos,
      atualizadoEm: new Date().toISOString(),
    });
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
