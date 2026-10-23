import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { primary } from './constants/color';
import SolEntreNuvens from './assets/sunCloud.png';
import Sol from './assets/sun.png';
import Nublado from './assets/cloud.png';
import SolEChuva from './assets/sunRain.png';
import Chuva from './assets/rain.png';
import {
  Card,
  TopCard,
  Linha,
  Icone,
  Cidade,
  Valor,
} from './temperatura.styled.jsx';

const API_KEY = '34402a45e8a24b4194335812211910';
const API_URL = 'https://api.weatherapi.com/v1/current.json';
const STORAGE_KEY = 'temperaturas:v1';
const CACHE_TTL = 10 * 60 * 1000;
const TIMEOUT_MS = 5000;

const CIDADES_PADRAO = [
  { nome: 'Pelotas', coord: '-31.768099,-52.341164' },
  { nome: 'Rio Grande', coord: '-32.0332,-52.0986' },
  { nome: 'São Lourenço', coord: '-31.3629,-51.9789' },
];

const getLocalWeatherIcon = (conditionText = '') => {
  const text = conditionText.toLowerCase();
  if (text.includes('sunny')) return Sol;
  if (text.includes('partly') || text.includes('cloudy')) return SolEntreNuvens;
  if (text.includes('overcast') || text === 'cloudy') return Nublado;
  if (text.includes('rain') && text.includes('sun')) return SolEChuva;
  if (text.includes('rain')) return Chuva;
  return Nublado;
};

const lerCache = () => {
  try {
    const bruto = localStorage.getItem(STORAGE_KEY);
    if (!bruto) return {};
    const cache = JSON.parse(bruto);
    return cache && typeof cache.dados === 'object' ? cache.dados : {};
  } catch {
    return {};
  }
};

const cacheValido = () => {
  try {
    const bruto = localStorage.getItem(STORAGE_KEY);
    if (!bruto) return false;
    const cache = JSON.parse(bruto);
    if (!cache || typeof cache.atualizadoEm !== 'number') return false;
    return Date.now() - cache.atualizadoEm < CACHE_TTL;
  } catch {
    return false;
  }
};

const gravarCache = (dados) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ atualizadoEm: Date.now(), dados }),
    );
  } catch {
    /* localStorage indisponível */
  }
};

const Temperatura = ({
  background = primary,
  cidades = CIDADES_PADRAO,
  intervalo = 6000,
  buscaIntervalo = 600000,
}) => {
  const [dados, setDados] = useState(lerCache);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let ativo = true;

    const buscar = async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const resultados = await Promise.allSettled(
        cidades.map(async (cidade) => {
          const resposta = await fetch(
            `${API_URL}?key=${API_KEY}&q=${cidade.coord}&aqi=no`,
            { signal: controller.signal },
          );

          if (!resposta.ok) {
            throw new Error(`Falha ao buscar ${cidade.nome}`);
          }

          const json = await resposta.json();

          return [
            cidade.nome,
            {
              temperatura: Math.round(json.current.temp_c),
              condicao: json.current.condition.text,
            },
          ];
        }),
      );

      clearTimeout(timeout);
      if (!ativo) return;

      const novos = {};
      resultados.forEach((resultado) => {
        if (resultado.status === 'fulfilled') {
          const [nome, info] = resultado.value;
          novos[nome] = info;
        }
      });

      if (Object.keys(novos).length === 0) return;

      setDados((anteriores) => {
        const atualizados = { ...anteriores, ...novos };
        gravarCache(atualizados);
        return atualizados;
      });
    };

    const cache = lerCache();
    const precisaBuscar =
      !cacheValido() || cidades.some((cidade) => !cache[cidade.nome]);

    if (precisaBuscar) buscar();

    const intervaloId = setInterval(buscar, buscaIntervalo);

    return () => {
      ativo = false;
      clearInterval(intervaloId);
    };
  }, [cidades, buscaIntervalo]);

  const disponiveis = cidades.filter((cidade) => dados[cidade.nome]);
  const exibidas = disponiveis.length > 0 ? disponiveis : cidades;
  const quantidade = exibidas.length;

  useEffect(() => {
    if (quantidade <= 1) return undefined;

    const id = setInterval(() => {
      setIndex((anterior) => (anterior + 1) % quantidade);
    }, intervalo);

    return () => clearInterval(id);
  }, [quantidade, intervalo]);

  const cidadeAtual = quantidade > 0 ? exibidas[index % quantidade] : null;
  const info = cidadeAtual ? dados[cidadeAtual.nome] : null;

  return (
    <Card>
      <TopCard $background={background}>
        <AnimatePresence mode="wait" initial={false}>
          {cidadeAtual && (
            <Linha
              key={cidadeAtual.nome}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              <Icone src={getLocalWeatherIcon(info?.condicao)} alt="" />
              <Cidade $longa={cidadeAtual.nome.length > 12}>
                {cidadeAtual.nome}
              </Cidade>
              <Valor>{info ? `${info.temperatura}°` : '--°'}</Valor>
            </Linha>
          )}
        </AnimatePresence>
      </TopCard>
    </Card>
  );
};

export default Temperatura;
