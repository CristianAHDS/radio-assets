import { useEffect, useState } from 'react';
import {
  ARQUIVOS_ELEICOES,
  REFRESH_INTERVAL,
  parseApuracaoArquivo,
  urlApuracao,
} from '../utils/eleicoes';

const FUNCAO = `${window.location.origin}/.netlify/functions/eleicoes`;

const buscarNaFuncao = async (cargo) => {
  const res = await fetch(`${FUNCAO}?cargo=${encodeURIComponent(cargo)}`, {
    cache: 'no-store',
  });
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

export const useEleicoes = (cargo = 'presidente') => {
  const [state, setState] = useState({
    cargo,
    candidatos: [],
    total: 0,
    secoesApuradas: null,
    atualizadoEm: null,
    carregando: true,
    erro: null,
  });

  useEffect(() => {
    let cancelled = false;

    if (!ARQUIVOS_ELEICOES[cargo]) {
      setState({
        cargo,
        candidatos: [],
        total: 0,
        secoesApuradas: null,
        atualizadoEm: null,
        carregando: false,
        erro: `Cargo "${cargo}" inválido`,
      });
      return undefined;
    }

    const load = async () => {
      let data = null;
      let erro = null;

      try {
        data = await buscarNaFuncao(cargo);
      } catch {
        try {
          data = await buscarNoArquivo(cargo);
        } catch (err) {
          erro = err.message;
        }
      }

      if (cancelled) return;

      if (!data) {
        setState((prev) => ({
          ...prev,
          cargo,
          carregando: false,
          erro,
        }));
        return;
      }

      setState({
        cargo,
        ...data,
        total: data.candidatos.length,
        carregando: false,
        erro: null,
      });
    };

    load();
    const interval = setInterval(load, REFRESH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [cargo]);

  return state;
};

export { ARQUIVOS_ELEICOES };
export default useEleicoes;