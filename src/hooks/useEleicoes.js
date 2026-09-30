import { useEffect, useState } from 'react';
import {
  ARQUIVOS_ELEICOES,
  REFRESH_INTERVAL,
  parseApuracaoArquivo,
  urlApuracao,
} from '../utils/eleicoes';

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
    const url = urlApuracao(cargo);
    let cancelled = false;

    if (!url) {
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
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = parseApuracaoArquivo(await res.text());
        if (cancelled) return;
        setState({
          cargo,
          ...data,
          total: data.candidatos.length,
          carregando: false,
          erro: null,
        });
      } catch (err) {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          cargo,
          carregando: false,
          erro: err.message,
        }));
      }
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