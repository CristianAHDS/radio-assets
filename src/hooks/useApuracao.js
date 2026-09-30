import { useEffect, useRef, useState } from 'react';
import {
  APURACAO_CONFIG,
  CANDIDATOS_INICIAIS,
  SECOES_TOTAIS,
  SECOES_APURADAS_INICIAL,
} from '../components/apuracao/data';

const ENDPOINT = `${window.location.origin}/.netlify/functions/apuracao`;
const REFRESH_INTERVAL = 60 * 1000;

const buildUrl = (config) => {
  const params = new URLSearchParams();

  Object.entries(config).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      params.set(key, String(value).trim());
    }
  });

  const qs = params.toString();
  return qs ? `${ENDPOINT}?${qs}` : ENDPOINT;
};

const FALLBACK = {
  candidatos: CANDIDATOS_INICIAIS,
  secoesTotais: SECOES_TOTAIS,
  secoesApuradas: SECOES_APURADAS_INICIAL,
  totalVotos: CANDIDATOS_INICIAIS.reduce((acc, c) => acc + c.votos, 0),
  atualizadoEm: null,
  live: false,
};

export const useApuracao = (config = {}) => {
  const [state, setState] = useState(FALLBACK);
  const configRef = useRef(config);

  configRef.current = config;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const url = buildUrl({ ...APURACAO_CONFIG, ...configRef.current });
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.candidatos) && data.candidatos.length > 0) {
          setState({ ...FALLBACK, ...data, live: true });
        }
      } catch {
        // mantém o último estado válido (fallback fixo na primeira carga)
      }
    };

    load();
    const interval = setInterval(load, REFRESH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return state;
};
