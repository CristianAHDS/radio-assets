import { useEffect, useState } from 'react';
import {
  ARQUIVOS_ELEICOES,
  REFRESH_INTERVAL,
  parseApuracaoArquivo,
  urlApuracao,
} from '../utils/eleicoes';

const FUNCAO = `${window.location.origin}/.netlify/functions/eleicoes`;
const TIMEOUT_MS = 3000;
const CACHE_KEY = 'eleicoes:v1';

const cache = new Map();
const emVoo = new Map();

const lerDisco = () => {
  try {
    const bruto = localStorage.getItem(CACHE_KEY);
    const dados = bruto ? JSON.parse(bruto) : null;
    return dados && typeof dados === 'object' ? dados : {};
  } catch {
    return {};
  }
};

const gravarDisco = (cargo, data) => {
  try {
    const dados = lerDisco();
    dados[cargo] = data;
    localStorage.setItem(CACHE_KEY, JSON.stringify(dados));
  } catch {
    cache.set(cargo, data);
  }
};

const buscarNaFuncao = async (cargo) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${FUNCAO}?cargo=${encodeURIComponent(cargo)}`, {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.candidatos) || data.candidatos.length === 0) {
      throw new Error('Sem candidatos');
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
};

const buscarNoArquivo = async (cargo) => {
  const res = await fetch(urlApuracao(cargo), { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseApuracaoArquivo(await res.text());
};

const carregar = async (cargo) => {
  const [funcao, arquivo] = await Promise.allSettled([
    buscarNaFuncao(cargo),
    buscarNoArquivo(cargo),
  ]);

  if (funcao.status === 'fulfilled') return funcao.value;
  if (arquivo.status === 'fulfilled') return arquivo.value;

  throw new Error(
    funcao.reason?.message || arquivo.reason?.message || 'Falha ao carregar',
  );
};

const carregarCompartilhado = (cargo) => {
  if (!emVoo.has(cargo)) {
    const pedido = carregar(cargo).finally(() => emVoo.delete(cargo));
    emVoo.set(cargo, pedido);
  }
  return emVoo.get(cargo);
};

const fromData = (cargo, data, erro = null) => ({
  cargo,
  ...data,
  total: data.candidatos.length,
  carregando: false,
  erro,
});

const vazioDe = (cargo) => ({
  cargo,
  candidatos: [],
  total: 0,
  secoesApuradas: null,
  atualizadoEm: null,
  carregando: true,
  erro: null,
});

const recuperar = (cargo) => cache.get(cargo) || lerDisco()[cargo] || null;

export const useEleicoes = (cargo = 'presidente') => {
  const [state, setState] = useState(() => {
    const guardado = recuperar(cargo);
    return guardado ? fromData(cargo, guardado) : vazioDe(cargo);
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

    const guardado = recuperar(cargo);
    if (guardado) {
      setState(fromData(cargo, guardado));
    } else {
      setState((prev) => (prev.cargo === cargo ? prev : vazioDe(cargo)));
    }

    const load = async () => {
      let data = null;
      let erro = null;

      try {
        data = await carregarCompartilhado(cargo);
      } catch (err) {
        erro = err.message;
      }

      if (cancelled) return;

      if (!data) {
        setState((prev) => ({ ...prev, cargo, carregando: false, erro }));
        return;
      }

      cache.set(cargo, data);
      gravarDisco(cargo, data);
      setState(fromData(cargo, data));
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
