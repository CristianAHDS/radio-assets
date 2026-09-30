import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ARQUIVOS = {
  presidente: 'presidente.txt',
  governador: 'governador.txt',
  senador: 'senador.txt',
};

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
  const n = Number(texto.replace(/\./g, '').replace(',', '.'));
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
    const caminho = join(process.cwd(), 'public', arquivo);
    const bruto = await readFile(caminho, 'utf8');
    const json = JSON.parse(bruto);

    if (!json.success || typeof json.data !== 'string') {
      throw new Error('Formato de arquivo inesperado');
    }

    const candidatos = extrairCandidatos(json.data);
    const secoes = json.data.match(
      /eleicoes-apuracao__secoes[^>]*>\s*([\d.,]+)\s*</,
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({
        cargo,
        secoesApuradas: secoes ? paraNumero(secoes[1]) : null,
        total: candidatos.length,
        candidatos,
        atualizadoEm: new Date().toISOString(),
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
