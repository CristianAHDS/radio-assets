import { useEffect, useState } from 'react';
import {
  ARQUIVOS_ELEICOES,
  parseApuracaoArquivo,
  urlApuracao,
} from '../utils/eleicoes';

const FUNCAO = `${window.location.origin}/.netlify/functions/eleicoes`;
const TIMEOUT_MS = 3000;
const REFRESH_INTERVAL_MS = 30 * 1000;
const CACHE_KEY = 'eleicoes:v2';

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

const buscarNaFuncao = async (cargo, opcoes = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const params = new URLSearchParams({ cargo });
  if (opcoes.eleicao) params.set('eleicao', opcoes.eleicao);
  if (opcoes.uf) params.set('uf', opcoes.uf);
  if (opcoes.cd) params.set('cd', opcoes.cd);
  if (opcoes.formato) params.set('formato', opcoes.formato);

  try {
    const res = await fetch(`${FUNCAO}?${params.toString()}`, {
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

const buscarNaFuncaoSegundoTurno = async (cargo, uf = 'br') => {
  return buscarNaFuncao(cargo, {
    eleicao: '6258',
    uf,
    cd: 1,
    formato: 'unificado',
  });
};

const buscarNoArquivo = async (cargo, opcoes = {}) => {
  if (opcoes.eleicao && opcoes.uf && opcoes.cd) {
    const params = new URLSearchParams({
      ambiente: 'oficial',
      ciclo: 'ele2026',
      eleicao: opcoes.eleicao,
      uf: opcoes.uf,
      cargo: opcoes.cd,
      formato: opcoes.formato || 'simplificado',
    });
    const url = `https://resultados.tse.jus.br/oficial/ele2026/${opcoes.eleicao}/dados/${opcoes.uf}/${opcoes.uf}-c${String(opcoes.cd).padStart(4, '0')}-e${String(opcoes.eleicao).padStart(6, '0')}-u.json`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
  const res = await fetch(urlApuracao(cargo), { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseApuracaoArquivo(await res.text());
};

const carregar = async (cargo, opcoes = {}) => {
  const [funcao, arquivo] = await Promise.allSettled([
    buscarNaFuncao(cargo, opcoes),
    buscarNoArquivo(cargo, opcoes),
  ]);

  if (funcao.status === 'fulfilled') return funcao.value;
  if (arquivo.status === 'fulfilled') return arquivo.value;

  throw new Error(
    funcao.reason?.message || arquivo.reason?.message || 'Falha ao carregar',
  );
};

const carregarSegundoTurno = async (cargo, uf = 'br') => {
  return carregar(cargo, {
    eleicao: '6258',
    uf,
    cd: 1,
    formato: 'unificado',
  });
};

const carregarCompartilhado = (cargo, opcoes = {}) => {
  const chave = `${cargo}:${JSON.stringify(opcoes)}`;
  if (!emVoo.has(chave)) {
    const pedido = carregar(cargo, opcoes).finally(() => emVoo.delete(chave));
    emVoo.set(chave, pedido);
  }
  return emVoo.get(chave);
};

const recuperar = (cargo, opcoes = {}) => {
  const chave = `${cargo}:${JSON.stringify(opcoes)}`;
  const mem = cache.get(chave);
  if (mem) return mem;
  const disco = lerDisco();
  const salv = disco[chave];
  if (salv) return salv;
  if (opcoes.eleicao) {
    const chaveAntiga = `${cargo}:${JSON.stringify({ ...opcoes, eleicao: undefined })}`;
    if (disco[chaveAntiga]) return null;
  }
  return null;
};

const gravarDiscoComChave = (cargo, opcoes, data) => {
  try {
    const chave = `${cargo}:${JSON.stringify(opcoes)}`;
    const dados = lerDisco();
    dados[chave] = data;
    localStorage.setItem(CACHE_KEY, JSON.stringify(dados));
  } catch {
    const chave = `${cargo}:${JSON.stringify(opcoes)}`;
    cache.set(chave, data);
  }
};

const fromData = (cargo, data, erro = null) => {
  if (!data || !Array.isArray(data.candidatos)) {
    return {
      cargo,
      candidatos: [],
      total: 0,
      secoesApuradas: data?.secoesApuradas ?? null,
      secoesTotais: data?.secoesTotais ?? null,
      votosValidos: data?.votosValidos ?? 0,
      pctApurado: data?.pctApurado ?? 0,
      atualizadoEm: data?.atualizadoEm ?? null,
      carregando: false,
      erro,
      fonte: data?.fonte ?? 'tse',
    };
  }
  return {
    cargo,
    ...data,
    total: data.candidatos.length,
    carregando: false,
    erro,
  };
};

const vazioDe = (cargo) => ({
  cargo,
  candidatos: [],
  total: 0,
  secoesApuradas: null,
  atualizadoEm: null,
  carregando: true,
  erro: null,
});

export const useEleicoes = (cargo = 'presidente', opcoes = {}) => {
  const [state, setState] = useState(() => {
    const guardado = recuperar(cargo, opcoes);
    return guardado ? fromData(cargo, guardado) : vazioDe(cargo);
  });

  const isSegundoTurno = opcoes.eleicao === '6258';

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

    const guardado = recuperar(cargo, opcoes);
    if (guardado && (!isSegundoTurno || guardado.fonte === 'tse')) {
      setState(fromData(cargo, guardado));
    } else {
      setState((prev) => (prev.cargo === cargo ? prev : vazioDe(cargo)));
    }

    const load = async () => {
      let data = null;
      let erro = null;

      try {
        data = await carregarCompartilhado(cargo, opcoes);
      } catch (err) {
        erro = err.message;
      }

      if (cancelled) return;

      if (!data) {
        setState((prev) => ({ ...prev, cargo, carregando: false, erro }));
        return;
      }

      const chave = `${cargo}:${JSON.stringify(opcoes)}`;
      cache.set(chave, data);
      gravarDiscoComChave(cargo, opcoes, data);
      setState(fromData(cargo, data));
    };

    load();
    const interval = setInterval(load, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [cargo, JSON.stringify(opcoes)]);

  return state;
};

export { ARQUIVOS_ELEICOES };
export default useEleicoes;
