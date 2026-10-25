import { useEffect, useRef, useState } from 'react';
import { CORES_CANDIDATOS, CORES_FIXAS_CANDIDATOS } from '../components/apuracao/data';

const ENDPOINT = `${window.location.origin}/.netlify/functions/apuracao`;
const REFRESH_INTERVAL = 30 * 1000;
const TIMEOUT_MS = 4000;
const CACHE_KEY = 'apuracao-cidades-rs:v1';

export const CIDADES_ZONA_SUL_RS = [
  { codigo: '431490', nome: 'Pelotas' },
  { codigo: '431560', nome: 'Rio Grande' },
  { codigo: '430160', nome: 'Bagé' },
  { codigo: '431090', nome: 'Jaguarão' },
  { codigo: '431720', nome: 'São Lourenço do Sul' },
  { codigo: '430420', nome: 'Canguçu' },
  { codigo: '430070', nome: 'Arroio Grande' },
  { codigo: '430860', nome: 'Herval' },
  { codigo: '431360', nome: 'Pedras Altas' },
  { codigo: '432170', nome: 'Turuçu' },
  { codigo: '431210', nome: 'Morro Redondo' },
  { codigo: '430350', nome: 'Capão do Leão' },
  { codigo: '430430', nome: 'Cerrito' },
  { codigo: '431880', nome: 'Sentinela do Sul' },
  { codigo: '430470', nome: 'Chuí' },
{ codigo: '431690', nome: 'Sta Vitória do Palmar' },
  ];

export const CIDADES_PRINCIPAIS_RS = [
  { codigo: '431490', nome: 'Pelotas' },
  { codigo: '431560', nome: 'Rio Grande' },
  { codigo: '431340', nome: 'Porto Alegre' },
  { codigo: '430480', nome: 'Caxias do Sul' },
  { codigo: '431400', nome: 'Novo Hamburgo' },
  { codigo: '431850', nome: 'São Leopoldo' },
  { codigo: '431700', nome: 'Sapucaia do Sul' },
  { codigo: '430890', nome: 'Gravataí' },
  { codigo: '430920', nome: 'Guaíba' },
  { codigo: '431780', nome: 'Santa Maria' },
  { codigo: '431280', nome: 'Passo Fundo' },
  { codigo: '431600', nome: 'Rio Grande' },
  { codigo: '431090', nome: 'Jaguarão' },
  { codigo: '430160', nome: 'Bagé' },
  { codigo: '431720', nome: 'São Lourenço do Sul' },
  { codigo: '430420', nome: 'Canguçu' },
  { codigo: '431210', nome: 'Morro Redondo' },
  { codigo: '430350', nome: 'Capão do Leão' },
  { codigo: '431690', nome: 'Sta Vitória do Palmar' },
  { codigo: '430470', nome: 'Chuí' },
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

const buildUrl = (municipio) => {
  const params = new URLSearchParams({ ...CONFIG_SEGUNDO_TURNO, uf: 'rs', municipio });
  return `${ENDPOINT}?${params.toString()}`;
};

const vazio = (cidade) => ({
  codigo: cidade.codigo,
  nome: cidade.nome,
  candidatos: CANDIDATOS_BASE,
  totalVotos: 0,
  pctApurado: 0,
  secoesApuradas: 0,
  secoesTotais: 0,
  atualizadoEm: null,
  live: false,
});

const normalizar = (cidade, data) => {
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
    codigo: cidade.codigo,
    nome: cidade.nome,
    candidatos,
    totalVotos: total,
    pctApurado: data.pctApurado || 0,
    secoesApuradas: data.secoesApuradas || 0,
    secoesTotais: data.secoesTotais || 0,
    atualizadoEm: data.atualizadoEm || null,
    live: candidatos.length > 0,
  };
};

const aplicarCores = (cidades) => {
  const votosPorNumero = new Map();

  cidades.forEach((cidade) => {
    cidade.candidatos.forEach((cand) => {
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

  return cidades.map((cidade) => ({
    ...cidade,
    candidatos: cidade.candidatos.map((cand) => ({
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
    if (!dados || !Array.isArray(dados.cidades) || dados.cidades.length === 0) return null;
    if (!dados.cidades.every((c) => c && c.codigo && c.nome && Array.isArray(c.candidatos)))
      return null;
    return dados;
  } catch {
    return null;
  }
};

const gravarCache = (cidades) => {
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ cidades, atualizadoEm: new Date().toISOString() }),
    );
  } catch {
  }
};

export const useApuracaoCidadesRS = () => {
  const cacheRef = useRef(undefined);
  if (cacheRef.current === undefined) {
    cacheRef.current = lerCache();
  }

  const [state, setState] = useState(() => {
    const cache = cacheRef.current;
    if (!cache) {
      return { cidades: CIDADES_ZONA_SUL_RS.map(vazio), carregando: true, atualizadoEm: null };
    }
    return {
      cidades: aplicarCores(cache.cidades),
      carregando: false,
      atualizadoEm: cache.atualizadoEm ? new Date(cache.atualizadoEm) : null,
    };
  });

  const anteriorRef = useRef(
    new Map((cacheRef.current?.cidades || []).map((cidade) => [cidade.codigo, cidade])),
  );

  useEffect(() => {
    let cancelled = false;

    const buscar = async (cidade) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const res = await fetch(buildUrl(cidade.codigo), {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return normalizar(cidade, await res.json());
      } catch {
        return anteriorRef.current.get(cidade.codigo) || vazio(cidade);
      } finally {
        clearTimeout(timer);
      }
    };

    const load = async () => {
      const resultados = await Promise.all(CIDADES_ZONA_SUL_RS.map(buscar));
      if (cancelled) return;

      resultados.forEach((resultado) => {
        anteriorRef.current.set(resultado.codigo, resultado);
      });

      gravarCache(resultados);

      setState({
        cidades: aplicarCores(resultados),
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

export default useApuracaoCidadesRS;