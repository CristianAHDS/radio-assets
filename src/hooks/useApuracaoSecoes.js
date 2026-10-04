import { useEffect, useState } from 'react';
import {
  REFRESH_INTERVAL,
  SECOES_APURACAO,
  parseApuracaoArquivo,
  urlApuracao,
} from '../utils/eleicoes';

const FUNCAO = `${window.location.origin}/.netlify/functions/eleicoes`;

const urlFuncao = (cargo) =>
  `${FUNCAO}?cargo=${encodeURIComponent(cargo)}`;

const buscarNaFuncao = async (cargo) => {
  const res = await fetch(urlFuncao(cargo), { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data.candidatos) || data.candidatos.length === 0) {
    throw new Error('Sem candidatos');
  }
  return data;
};

const buscarNoArquivo = async (cargo) => {
  const res = await fetch(urlApuracao(cargo), { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseApuracaoArquivo(await res.text());
};

export const useApuracaoSecoes = () => {
  const [state, setState] = useState({
    secoes: [],
    carregando: true,
    atualizadoEm: null,
  });

  useEffect(() => {
    let cancelled = false;

    const carregarSecao = async (secao) => {
      try {
        return { ...secao, ...(await buscarNaFuncao(secao.cargo)) };
      } catch {
        try {
          return { ...secao, ...(await buscarNoArquivo(secao.cargo)) };
        } catch {
          return null;
        }
      }
    };

    const load = async () => {
      const resultados = await Promise.all(SECOES_APURACAO.map(carregarSecao));
      if (cancelled) return;

      const secoes = resultados.filter(Boolean);
      setState((prev) => ({
        secoes: secoes.length > 0 ? secoes : prev.secoes,
        carregando: false,
        atualizadoEm: new Date(),
      }));
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

export default useApuracaoSecoes;
