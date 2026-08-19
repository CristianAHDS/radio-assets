export const handler = async () => {
  try {
    const res = await fetch('https://ahoradosul.com.br/', {
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

    const titles = [...html.matchAll(/<h3 class="post__titulo">([^<]+)<\/h3>/g)]
      .map((match) => match[1].replace(/\s+/g, ' ').trim())
      .filter(Boolean);

    const unique = [...new Set(titles)];

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titles: unique, updatedAt: new Date().toISOString() }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};