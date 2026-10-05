import { useEffect, useState } from 'react';

const AGRO_URL = `${window.location.origin}/.netlify/functions/agro`;

const UPDATE_HOURS = [4, 5];

export const msUntilNextUpdate = (now = new Date()) => {
  let next = null;

  for (let dayOffset = 0; dayOffset <= 1; dayOffset += 1) {
    for (const hour of UPDATE_HOURS) {
      const candidate = new Date(now);
      candidate.setDate(now.getDate() + dayOffset);
      candidate.setHours(hour, 0, 0, 0);

      if (candidate.getTime() > now.getTime()) {
        if (!next || candidate.getTime() < next.getTime()) {
          next = candidate;
        }
      }
    }
  }

  return next ? next.getTime() - now.getTime() : 60 * 60 * 1000;
};

export const DEFAULT_QUOTES = [
  { label: 'Dólar', value: 'R$ 5,42', change: 0.32 },
  { label: 'Euro', value: 'R$ 5,90', change: -0.12 },
  { label: 'Soja (saca 60kg)', value: 'R$ 132,50', change: 0.48 },
  { label: 'Milho (saca 60kg)', value: 'R$ 61,80', change: -0.35 },
  { label: 'Boi Gordo (@)', value: 'R$ 318,40', change: 0.2 },
  { label: 'Café Arábica (saca 60kg)', value: 'R$ 1.842,00', change: 1.1 },
  { label: 'Trigo (ton)', value: 'R$ 1.315,00', change: -0.15 },
];

const formatChange = (change) => {
  if (change === null || change === undefined || Number.isNaN(Number(change))) {
    return '';
  }

  const value = Number(change);
  const arrow = value >= 0 ? '▲' : '▼';
  const sign = value >= 0 ? '+' : '-';

  return `${arrow} ${sign}${Math.abs(value).toFixed(2).replace('.', ',')}%`;
};

export const formatQuotes = (quotes) => {
  const items = quotes
    .filter((quote) => quote && quote.label && quote.value)
    .map((quote) => {
      const variation = formatChange(quote.change);
      return variation
        ? `${quote.label} ${quote.value} ${variation}`
        : `${quote.label} ${quote.value}`;
    });

  if (items.length === 0) return '';

  return `${items.join('   •   ')}   •`;
};

export const DEFAULT_AGRO_TEXT = formatQuotes(DEFAULT_QUOTES);

export const useAgroQuotes = () => {
  const [text, setText] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timer;

    const load = async () => {
      try {
        const res = await fetch(AGRO_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const quotes = Array.isArray(data?.quotes) ? data.quotes : [];
        const formatted = formatQuotes(quotes);
        if (!cancelled && formatted) setText(formatted);
      } catch {
        // mantém o fallback local em caso de falha
      }
    };

    const scheduleNext = () => {
      timer = setTimeout(async () => {
        await load();
        if (!cancelled) scheduleNext();
      }, msUntilNextUpdate());
    };

    load();
    scheduleNext();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return text;
};
