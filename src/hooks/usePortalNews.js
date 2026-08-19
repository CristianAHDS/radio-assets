import { useEffect, useState } from 'react';

const NEWS_URL = `${window.location.origin}/.netlify/functions/news`;

const joinTitles = (titles) => `${titles.map((t) => `  ${t}  `).join('•')} •`;

export const usePortalNews = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const res = await fetch(NEWS_URL, { signal: controller.signal });
        const data = await res.json();
        clearTimeout(timeout);
        if (cancelled) return;
        if (data && Array.isArray(data.titles) && data.titles.length > 0) {
          setNews(joinTitles(data.titles));
        }
      } catch {
        // mantém o texto atual em caso de falha
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return news;
};