import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const AGRO_FILE = resolve(__dirname, '../public/agro.json');

const AWESOME_URL =
  'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL';

const AGROLINK = {
  'Soja (saca 60kg)':
    'https://www.agrolink.com.br/cotacoes/soja-em-grao-sc-60kg/rs/pelotas',
  'Milho (saca 60kg)':
    'https://www.agrolink.com.br/cotacoes/milho-seco-sc-60kg/rs/pelotas',
};

// Sem fonte pública confiável: mantém o último valor gravado no arquivo.
const MANUAIS = ['Boi Gordo (@)', 'Café Arábica (saca 60kg)', 'Trigo (ton)'];

const ORDEM = [
  'Dólar',
  'Euro',
  'Soja (saca 60kg)',
  'Milho (saca 60kg)',
  ...MANUAIS,
];

const PADRAO = {
  'Boi Gordo (@)': { label: 'Boi Gordo (@)', value: 'R$ 395,00', change: 0 },
  'Café Arábica (saca 60kg)': {
    label: 'Café Arábica (saca 60kg)',
    value: 'R$ 1.750,00',
    change: 0,
  },
  'Trigo (ton)': { label: 'Trigo (ton)', value: 'R$ 1.550,00', change: 0 },
};

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const FETCH_TIMEOUT = 20000;

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

const formatCurrency = (value) =>
  `R$ ${Number(value).toFixed(2).replace('.', ',')}`;

const fetchCurrencies = async () => {
  const res = await fetchWithTimeout(AWESOME_URL);
  if (!res.ok) throw new Error(`AwesomeAPI HTTP ${res.status}`);

  const data = await res.json();

  return [
    ['USDBRL', 'Dólar'],
    ['EURBRL', 'Euro'],
  ]
    .filter(([key]) => data[key])
    .map(([key, label]) => {
      const change = Number(data[key].pctChange);
      return {
        label,
        value: formatCurrency(data[key].bid),
        change: Number.isFinite(change) ? change : null,
      };
    });
};

const stripHtml = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

const fetchAgrolink = async (label, url) => {
  const res = await fetchWithTimeout(url, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!res.ok) throw new Error(`Agrolink HTTP ${res.status}`);

  const html = await res.text();

  // "Cotação de Soja em Grão Sc 60Kg em Pelotas - RS: R$ 143,00 (11/11/2026)"
  const meta = html.match(/<meta name="description" content="([^"]+)"/);
  const preco = meta?.[1].match(/: R\$\s?([\d.]+,\d{2})/);
  if (!preco) throw new Error(`${label}: preço não encontrado`);

  // Variação fica ao lado do gráfico, com seta: "▲ 1,4%"
  const inicio = html.indexOf('Variação no período');
  const bloco = inicio >= 0 ? stripHtml(html.slice(inicio, inicio + 1400)) : '';
  const variacao = bloco.match(/([▲▼])\s*([\d.,]+)\s*%/);

  let change = null;
  if (variacao) {
    const valor = Number(variacao[2].replace('.', '').replace(',', '.'));
    if (Number.isFinite(valor)) {
      change = variacao[1] === '▼' ? -valor : valor;
    }
  }

  return { label, value: `R$ ${preco[1]}`, change };
};

const lerAnteriores = async () => {
  try {
    const bruto = await readFile(AGRO_FILE, 'utf8');
    const dados = JSON.parse(bruto);
    const mapa = {};
    for (const quote of dados?.quotes ?? []) {
      if (quote?.label && quote?.value) mapa[quote.label] = quote;
    }
    return mapa;
  } catch {
    return {};
  }
};

export const updateAgro = async () => {
  const anteriores = await lerAnteriores();
  const resultados = await Promise.allSettled([
    fetchCurrencies(),
    fetchAgrolink('Soja (saca 60kg)', AGROLINK['Soja (saca 60kg)']),
    fetchAgrolink('Milho (saca 60kg)', AGROLINK['Milho (saca 60kg)']),
  ]);

  const novos = new Map();
  let fontesOk = 0;

  for (const resultado of resultados) {
    if (resultado.status === 'rejected') {
      console.warn(`[agro] fonte falhou: ${resultado.reason?.message}`);
      continue;
    }
    fontesOk += 1;
    const itens = Array.isArray(resultado.value)
      ? resultado.value
      : [resultado.value];
    for (const item of itens) novos.set(item.label, item);
  }

  if (fontesOk === 0) {
    console.warn('[agro] nenhuma fonte respondeu, mantendo arquivo atual');
    return null;
  }

  const quotes = ORDEM.map(
    (label) => novos.get(label) ?? anteriores[label] ?? PADRAO[label],
  ).filter(Boolean);

  const payload = { quotes, updatedAt: new Date().toISOString() };

  await mkdir(dirname(AGRO_FILE), { recursive: true });
  await writeFile(AGRO_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  const resumo = quotes.map((q) => q.label).join(', ');
  console.log(`[agro] cotações atualizadas (${fontesOk} fonte(s)): ${resumo}`);

  return payload;
};

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  await updateAgro();
}
