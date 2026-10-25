import { useEffect, useRef, useState } from 'react';
import { CORES_CANDIDATOS, CORES_FIXAS_CANDIDATOS } from '../components/apuracao/data';

const ENDPOINT = `${window.location.origin}/.netlify/functions/apuracao`;
const REFRESH_INTERVAL = 30 * 1000;
const TIMEOUT_MS = 4000;
const CACHE_KEY = 'apuracao-estados:v1';

export const UFS = [
  'ac',
  'al',
  'am',
  'ap',
  'ba',
  'ce',
  'df',
  'es',
  'go',
  'ma',
  'mg',
  'ms',
  'mt',
  'pa',
  'pb',
  'pe',
  'pi',
  'pr',
  'rj',
  'rn',
  'ro',
  'rr',
  'rs',
  'sc',
  'se',
  'sp',
  'to',
];

export const CONFIG_SEGUNDO_TURNO = {
  ambiente: 'oficial',
  ciclo: 'ele2026',
  eleicao: '6258',
  cargo: '1',
  formato: 'unificado',
};

const CANDIDATOS_BASE = [
  { numero: 22, nome: 'FLAVIO BOLSONARO', nomeUrna: 'FLAVIO BOLSONARO', votos: 0, pct: 0 },
  { numero: 13, nome: 'LULA', nomeUrna: 'LULA', votos: 0, pct: 0 },
];

const buildUrl = (uf) => {
  const params = new URLSearchParams({ ...CONFIG_SEGUNDO_TURNO, uf });
  return `${ENDPOINT}?${params.toString()}`;
};

const vazio = (uf) => ({
  uf,
  candidatos: CANDIDATOS_BASE,
  totalVotos: 0,
  pctApurado: 0,
  secoesApuradas: 0,
  secoesTotais: 0,
  atualizadoEm: null,
  live: false,
});

const normalizar = (uf, data) => {
  const brutos = Array.isArray(data.candidatos) ? data.candidatos : [];
  const soma = brutos.reduce((acc, cand) => acc + (cand.votos || 0), 0);
  const total = data.totalVotos || soma;

  const candidatos = brutos
    .map((cand) => ({
      ...cand,
      pct: cand.pct > 0 ? cand.pct : total > 0 ? (cand.votos / total) * 100 : 0,
    }))
    .sort((a, b) => b.votos - a.votos || a.numero - b.numero)
    .slice(0, 2);

  return {
    uf,
    candidatos,
    totalVotos: total,
    pctApurado: data.pctApurado || 0,
    secoesApuradas: data.secoesApuradas || 0,
    secoesTotais: data.secoesTotais || 0,
    atualizadoEm: data.atualizadoEm || null,
    live: candidatos.length > 0,
  };
};

const aplicarCores = (estados) => {
  const votosPorNumero = new Map();

  estados.forEach((estado) => {
    estado.candidatos.forEach((cand) => {
      votosPorNumero.set(
        cand.numero,
        (votosPorNumero.get(cand.numero) || 0) + (cand.votos || 0),
      );
    });
  });

  const ordem = [...votosPorNumero.keys()].sort(
    (a, b) => votosPorNumero.get(b) - votosPorNumero.get(a) || a - b,
  );

  const cores = new Map(
    ordem.map((numero, i) => [
      numero,
      CORES_CANDIDATOS[i % CORES_CANDIDATOS.length],
    ]),
  );

  return estados.map((estado) => ({
    ...estado,
    candidatos: estado.candidatos.map((cand) => ({
      ...cand,
      cor: CORES_FIXAS_CANDIDATOS[cand.numero] || cores.get(cand.numero),
    })),
  }));
};

const lerCache = () => {
  try {
    const bruto = window.localStorage.getItem(CACHE_KEY);
    if (!bruto) return null;
    const dados = JSON.parse(bruto);
    if (!dados || !Array.isArray(dados.estados) || dados.estados.length === 0) return null;
    if (!dados.estados.every((estado) => estado && estado.uf && Array.isArray(estado.candidatos)))
      return null;
    return dados;
  } catch {
    return null;
  }
};

const gravarCache = (estados) => {
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ estados, atualizadoEm: new Date().toISOString() }),
    );
  } catch {
    /* storage indisponível — segue sem cache */
  }
};

export const useApuracaoEstados = () => {
  const cacheRef = useRef(undefined);
  if (cacheRef.current === undefined) {
    cacheRef.current = lerCache();
  }

  const [state, setState] = useState(() => {
    const cache = cacheRef.current;
    if (!cache) {
      return { estados: UFS.map(vazio), carregando: true, atualizadoEm: null };
    }
    return {
      estados: aplicarCores(cache.estados),
      carregando: false,
      atualizadoEm: cache.atualizadoEm ? new Date(cache.atualizadoEm) : null,
    };
  });

  const anteriorRef = useRef(
    new Map((cacheRef.current?.estados || []).map((estado) => [estado.uf, estado])),
  );

  useEffect(() => {
    let cancelled = false;

    const buscar = async (uf) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const res = await fetch(buildUrl(uf), {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return normalizar(uf, await res.json());
      } catch {
        return anteriorRef.current.get(uf) || vazio(uf);
      } finally {
        clearTimeout(timer);
      }
    };

    const load = async () => {
      const resultados = await Promise.all(UFS.map(buscar));
      if (cancelled) return;

      resultados.forEach((resultado) => {
        anteriorRef.current.set(resultado.uf, resultado);
      });

      gravarCache(resultados);

      setState({
        estados: aplicarCores(resultados),
        carregando: false,
        atualizadoEm: new Date(),
      });
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

export default useApuracaoEstados;
