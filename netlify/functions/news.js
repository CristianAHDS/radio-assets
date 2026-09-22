const PORTAL_URL = 'https://ahoradosul.com.br/';
const JINA_URL = 'https://r.jina.ai/https://ahoradosul.com.br/';
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

const parseDirect = (html) =>
  [...html.matchAll(/<h3 class="post__titulo">([^<]+)<\/h3>/g)]
    .map((match) => match[1].replace(/\s+/g, ' ').trim())
    .filter(Boolean);

const parseViaJina = (markdown) =>
  [...markdown.matchAll(/!\[Image \d+: ([^\]\r\n]+)\]/g)]
    .map((match) => match[1].replace(/\s+/g, ' ').trim())
    .filter(Boolean);

const clean = (titles) =>
  [...new Set(titles)].filter(
    (title) => title !== 'newsletter' && !/^Edição\s+\d+/.test(title)
  );

export const handler = async () => {
  try {
    let titles = [];

    const direct = await fetchWithTimeout(PORTAL_URL, {
      headers: { 'User-Agent': USER_AGENT },
    });

    if (direct.ok) {
      titles = parseDirect(await direct.text());
    }

    if (titles.length === 0) {
      const jina = await fetchWithTimeout(JINA_URL, {
        headers: { 'Accept': 'text/plain' },
      });

      if (jina.ok) {
        titles = parseViaJina(await jina.text());
      }
    }

    const unique = clean(titles);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({
        titles: unique,
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