const AWESOME_URL =
  'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL';

const CEPEA_INDICATORS = [
  { slug: 'soja', label: 'Soja (saca 60kg)' },
  { slug: 'milho', label: 'Milho (saca 60kg)' },
  { slug: 'boi-gordo', label: 'Boi Gordo (@)' },
  { slug: 'cafe', label: 'Café Arábica (saca 60kg)' },
  { slug: 'trigo', label: 'Trigo (ton)' },
];

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const fetchWithTimeout = async (url, options = {}, timeout = 15000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

const formatCurrency = (value) =>
  `R$ ${Number(value).toFixed(2).replace('.', ',')}`;

const fetchCurrencies = async () => {
  try {
    const res = await fetchWithTimeout(AWESOME_URL);
    if (!res.ok) return [];
    const data = await res.json();

    return [
      ['USDBRL', 'Dólar'],
      ['EURBRL', 'Euro'],
    ]
      .filter(([key]) => data[key])
      .map(([key, label]) => {
        const item = data[key];
        const change = Number(item.pctChange);
        return {
          label,
          value: formatCurrency(item.bid),
          change: Number.isFinite(change) ? change : null,
        };
      });
  } catch {
    return [];
  }
};

const fetchCepea = async ({ slug, label }) => {
  try {
    const res = await fetchWithTimeout(
      `https://www.cepea.org.br/br/indicador/${slug}.aspx`,
      { headers: { 'User-Agent': USER_AGENT } },
    );
    if (!res.ok) return null;

    const html = await res.text();
    const match = html.match(/R\$\s?([\d.]+,\d{2})/);
    if (!match) return null;

    return { label, value: `R$ ${match[1]}`, change: null };
  } catch {
    return null;
  }
};

export const handler = async () => {
  try {
    const [currencies, cepeaResults] = await Promise.all([
      fetchCurrencies(),
      Promise.all(CEPEA_INDICATORS.map((item) => fetchCepea(item))),
    ]);

    const quotes = [...currencies, ...cepeaResults.filter(Boolean)];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({
        quotes,
        updatedAt: new Date().toISOString(),
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
