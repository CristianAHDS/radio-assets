import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NEWS_FILE = resolve(__dirname, '../public/news.json');

const PORTAL_URL = 'https://ahoradosul.com.br/';
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const TITLE_REGEX = /<h3 class="post__titulo">([^<]+)<\/h3>/g;
const FETCH_TIMEOUT = 15000;

const ENTITIES = {
  '&amp;': '&',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
  '&lt;': '<',
  '&gt;': '>',
  '&ldquo;': '“',
  '&rdquo;': '”',
  '&lsquo;': '‘',
  '&rsquo;': '’',
  '&ndash;': '–',
  '&mdash;': '—',
};

const decodeEntities = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16)),
    )
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity] ?? entity);

const parseTitles = (html) =>
  [...html.matchAll(TITLE_REGEX)]
    .map((match) => decodeEntities(match[1]).replace(/\s+/g, ' ').trim())
    .filter(Boolean);

export const cleanTitles = (titles) =>
  [...new Set(titles)].filter(
    (title) =>
      title.toLowerCase() !== 'newsletter' && !/^Edição\s+\d+/i.test(title),
  );

export const updateNews = async () => {
  try {
    const response = await fetch(PORTAL_URL, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const titles = cleanTitles(parseTitles(await response.text()));

    if (titles.length === 0) {
      console.warn('[news] nenhum título encontrado, mantendo arquivo atual');
      return null;
    }

    const payload = { titles, updatedAt: new Date().toISOString() };

    await mkdir(dirname(NEWS_FILE), { recursive: true });
    await writeFile(NEWS_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

    console.log(
      `[news] ${titles.length} títulos atualizados em public/news.json`,
    );

    return payload;
  } catch (error) {
    console.warn(`[news] falha ao atualizar notícias: ${error.message}`);
    return null;
  }
};

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  await updateNews();
}
