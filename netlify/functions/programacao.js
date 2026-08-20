const SCHEDULE_URL = 'https://ahoradosul.com.br/programacao-radio-pelotense/';

const DAY_ORDER = [
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
  'domingo',
];

const normalize = (text) => text.replace(/\s+/g, ' ').trim();

export const handler = async () => {
  try {
    const res = await fetch(SCHEDULE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      },
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Portal retornou ${res.status}` }),
      };
    }

    const html = await res.text();
    const schedule = {};

    for (const day of DAY_ORDER) {
      const blockMatch = html.match(
        new RegExp(`<div class="dia"\\s+dia="${day}">([\\s\\S]*?)<\\/div>`, 'i'),
      );

      if (!blockMatch) {
        schedule[day] = [];
        continue;
      }

      const block = blockMatch[1];
      const entries = [
        ...block.matchAll(/<span>(\d{1,2}:\d{2})<\/span>\s*<h4>([\s\S]*?)<\/h4>/g),
      ]
        .map((match) => ({
          time: match[1],
          name: normalize(match[2]),
        }))
        .filter((entry) => entry.time && entry.name);

      schedule[day] = entries;
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        schedule,
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