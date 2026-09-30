export const ARQUIVOS_ELEICOES = {
  presidente: 'presidente.txt',
  governador: 'governador.txt',
  senador: 'senador.txt',
};

export const REFRESH_INTERVAL = 60 * 1000;

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
  if (!texto) return 0;
  const n = Number(
    String(texto)
      .replace(/[^\d.,]/g, '')
      .replace(/\./g, '')
      .replace(',', '.'),
  );
  return Number.isFinite(n) ? n : 0;
};

const paraBarra = (texto) => {
  if (!texto) return 0;
  const n = Number(String(texto).replace(',', '.').replace(/[^\d.]/g, ''));
  return Number.isFinite(n) ? n : 0;
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
      const barra = primeiraTag(bloco, /eleicoes-candidato__barra"\s*style="width:([\d.,]+)%/);

      const numeroPartido = partido && partido.match(/(\d+)\s*$/);
      const votosLimpo = votos ? votos.replace(/\s*votos?$/i, '').trim() : null;

      return {
        nome,
        partido,
        numeroPartido: numeroPartido ? Number(numeroPartido[1]) : null,
        foto,
        percentual,
        pct: paraNumero(percentual),
        votos: votosLimpo,
        votosNumero: paraNumero(votosLimpo),
        barra: paraBarra(barra),
      };
    })
    .filter(Boolean);
};

export const parseApuracaoHtml = (html) => {
  const dados = normalizar(html === undefined || html === null ? '' : html);
  const candidatos = extrairCandidatos(dados);
  const secoes = dados.match(/eleicoes-apuracao__secoes[^>]*>\s*([\d.,]+)\s*</);
  const atualizacao = primeiraTag(
    dados,
    /eleicoes-apuracao__atualizado"[^>]*>\s*([\s\S]*?)\s*</,
  );
  const atualizadoEm = atualizacao
    ? atualizacao.replace(/^atualizado\s*(?:[a-zà-ú]+\s*)?/i, '').trim() || null
    : null;

  return {
    secoesApuradas: secoes ? paraNumero(secoes[1]) : null,
    total: candidatos.length,
    candidatos,
    atualizadoEm,
  };
};

export const parseApuracaoArquivo = (conteudo) => {
  const json = JSON.parse(conteudo);
  if (!json.success || typeof json.data !== 'string') {
    throw new Error('Formato de arquivo inesperado');
  }
  return parseApuracaoHtml(json.data);
};

export const urlApuracao = (cargo) => {
  const arquivo = ARQUIVOS_ELEICOES[cargo];
  if (!arquivo) return null;
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${arquivo}`;
};