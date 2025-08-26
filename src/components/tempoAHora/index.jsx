import { useState, useEffect } from 'react';

import {
  Card,
  NameSection,
  MidleSection,
  InfoSection,
  Temp,
  Icon,
  IconImage,
} from './tempoOutros.styled.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SolEntreNuvens from '../../assets/sunCloud.png';
import Sol from '../../assets/sun.png';
import Nublado from '../../assets/cloud.png';
import SolEChuva from '../../assets/sunRain.png';
import Chuva from '../../assets/rain.png';

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

const cidades = [
  { nome: 'Arroio do Meio', coord: '-29.4053471,-51.9294533' },
  { nome: 'Bom Retiro do Sul', coord: '-29.6023095,-51.9793072' },
  { nome: 'Charqueadas', coord: '-29.9624367,-51.6409272' },
  { nome: 'Cruzeiro do Sul', coord: '-29.5091096,-51.981923' },
  { nome: 'Encantado', coord: '-29.2496229,-51.8684953' },
  { nome: 'Estrela', coord: '-29.485307,-51.954741' },
  { nome: 'Lajeado', coord: '-29.447872,-51.9762139' },
  { nome: 'Mato Leitão', coord: '-29.5355093,-52.1063235' },
  { nome: 'Muçum', coord: '-29.1970821,-51.8695857' },
  { nome: 'Roca Sales', coord: '-29.3025947,-51.8589285' },
  { nome: 'São Jerônimo', coord: '-29.9691323,-51.7426927' },
  { nome: 'Taquiari', coord: '-29.7915097,-51.8572538' },
  { nome: 'Teutônia', coord: '-29.4787474,-51.8090686' },
  { nome: 'Triunfo', coord: '-29.9494149,-51.7154383' },
  { nome: 'Venâncio Aires', coord: '-29.5721496,-52.1216905' },
];


const App = () => {
  const [weatherDataMap, setWeatherDataMap] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  const STORAGE_KEY = 'weatherDataMap';
  const TIMESTAMP_KEY = 'weatherDataTimestamp';

  const fetchAllCitiesWeather = async () => {
    const newWeatherDataMap = {};
    for (const cidade of cidades) {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=34402a45e8a24b4194335812211910&q=${cidade.coord}&aqi=no`,
        );
        const data = await res.json();
        newWeatherDataMap[cidade.nome] = {
          nomeCorrigido: cidade.nome, // força usar o nome da lista de cidades
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
      const cacheIsValid = cache && timestamp && now - timestamp < 60000; // menos de 60s

      if (cacheIsValid) {
        setWeatherDataMap(JSON.parse(cache));
      } else {
        fetchAllCitiesWeather();
      }
    };

    loadData();

    const refreshInterval = setInterval(fetchAllCitiesWeather, 60000); // atualiza a cada 60s
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const cidadeInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cidades.length);
    }, 15000); // troca cidade a cada 15s

    return () => clearInterval(cidadeInterval);
  }, []);

  const cidadeAtual = cidades[currentIndex];
  const dados = weatherDataMap[cidadeAtual.nome];

  if (!dados) return <p>Carregando dados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AnimatePresence mode="wait">
      <Card>
        <NameSection
          $isLongName={dados.nomeCorrigido === 'São Lourenço do Sul'}
        >
          <motion.div
            key={`name-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {dados.nomeCorrigido}
          </motion.div>
        </NameSection>

        <MidleSection>
          <Temp>
            <motion.div
              key={`temp-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {dados.temperatura}ºC
            </motion.div>
          </Temp>

          <Icon>
            <motion.div
              key={`icon-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconImage src={dados.icon} alt="tempo" />
            </motion.div>
          </Icon>
        </MidleSection>

        <InfoSection>
          <motion.div
            key={`sensacao-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <strong>Sensação:</strong>
            <div style={{ marginLeft: '10px' }}>{dados.sensacao}ºC</div>
          </motion.div>
        </InfoSection>
      </Card>
    </AnimatePresence>
  );
};

export default App;
