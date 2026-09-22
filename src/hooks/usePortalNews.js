import { useEffect, useState } from 'react';

const NEWS_URL = `${window.location.origin}/.netlify/functions/news`;
const REFRESH_INTERVAL = 5 * 60 * 1000;

const joinTitles = (titles) => `${titles.map((t) => `  ${t}  `).join('•')} •`;

let inflight = null;

const fetchNews = () => {
  if (!inflight) {
    inflight = fetch(NEWS_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        inflight = null;
        throw err;
      })
      .then((data) => {
        inflight = null;
        return data;
      });
  }
  return inflight;
};

export const usePortalNews = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await fetchNews();
        if (cancelled) return;
        if (data && Array.isArray(data.titles) && data.titles.length > 0) {
          setNews(joinTitles(data.titles));
        }
      } catch {
        // mantém o texto atual em caso de falha
      }
    };

    load();
    const interval = setInterval(load, REFRESH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return news;
};