import { useState, useEffect } from 'react';

import { Card, MidleSection, Temp, Icon, IconImage } from './styles.styled.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SolEntreNuvens from '../../../assets/sunCloud.png';
import Sol from '../../../assets/sun.png';
import Nublado from '../../../assets/cloud.png';
import SolEChuva from '../../../assets/sunRain.png';
import Chuva from '../../../assets/rain.png';

import { motion, AnimatePresence } from 'framer-motion';

const getLocalWeatherIcon = (conditionText) => {
  const text = conditionText.toLowerCase();
  if (text.includes('sunny')) return Sol;
  if (text.includes('partly') || text.includes('cloudy')) return SolEntreNuvens;
  if (text.includes('overcast') || text === 'cloudy') return Nublado;
  if (text.includes('rain') && text.includes('sun')) return SolEChuva;
  if (text.includes('rain')) return Chuva;
  return Nublado;
};

const cidades = [{ nome: 'Pelotas', coord: '-31.768099,-52.341164' }];
const App = () => {
  const [weatherDataMap, setWeatherDataMap] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  const STORAGE_KEY = 'weatherDataMap';
  const TIMESTAMP_KEY = 'weatherDataTimestamp';

  const corrigirNome = (nome) => {
    if (nome === 'Abolicao') return 'Amaral Ferrador';
    if (nome === 'Olimpo') return 'Pedro Osório';
    if (nome === 'Cangucu') return 'Canguçu';
    if (nome === 'Sao Lourenco Do Sul') return 'São Lourenço do Sul';
    if (nome === 'Jaguarao') return 'Jaguarão';
    if (nome === 'Guarda Nova') return 'Herval';
    if (nome === 'Passo Das Pedras') return 'Turuçu';
    if (nome === 'Seival') return 'Candiota';
    return nome;
  };

  const fetchAllCitiesWeather = async () => {
    const newWeatherDataMap = {};
    for (const cidade of cidades) {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=34402a45e8a24b4194335812211910&q=${cidade.coord}&aqi=no`,
        );
        const data = await res.json();
        newWeatherDataMap[cidade.nome] = {
          nomeCorrigido: corrigirNome(data.location.name),
          temperatura: Math.round(Number(data.current.temp_c)),
          sensacao: Math.round(Number(data.current.feelslike_c)),
          icon: getLocalWeatherIcon(data.current.condition.text),
        };
      } catch (err) {
        console.warn(`Erro ao buscar dados de ${cidade.nome}`);
      }
    }

    // Salva no estado e no localStorage
    setWeatherDataMap(newWeatherDataMap);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newWeatherDataMap));
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
  };

  useEffect(() => {
    const loadData = () => {
      const cache = localStorage.getItem(STORAGE_KEY);
      const timestamp = parseInt(localStorage.getItem(TIMESTAMP_KEY), 10);

      const now = Date.now();
      const cacheIsValid = cache && timestamp && now - timestamp < 20000; // menos de 60s

      if (cacheIsValid) {
        setWeatherDataMap(JSON.parse(cache));
      } else {
        fetchAllCitiesWeather();
      }
    };

    loadData();

    const refreshInterval = setInterval(fetchAllCitiesWeather, 20000); // atualiza a cada 60s
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const cidadeInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cidades.length);
    }, 5000); // troca cidade a cada 6s

    return () => clearInterval(cidadeInterval);
  }, []);

  const cidadeAtual = cidades[currentIndex];
  const dados = weatherDataMap[cidadeAtual.nome];

  if (!dados) return <p>Carregando dados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AnimatePresence mode="wait">
      <Card>
        <MidleSection>
          <Temp>{dados.temperatura}ºC</Temp>

          <Icon>
            <IconImage src={dados.icon} alt="tempo" />
          </Icon>
        </MidleSection>
      </Card>
    </AnimatePresence>
  );
};

export default App;
