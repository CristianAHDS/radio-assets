import { useState, useEffect } from 'react';
import './App.css';
import {
  Card,
  NameSection,
  MidleSection,
  InfoSection,
  Temp,
  Icon,
  IconImage,
  InfoSectionAlert,
} from './app.styled';

import SolEntreNuvens from './assets/sunCloud.png';
import Sol from './assets/sun.png';
import Nublado from './assets/cloud.png';
import SolEChuva from './assets/sunRain.png';
import Chuva from './assets/rain.png';

import { GoAlert } from 'react-icons/go';

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

const traduzirAlerta = (headline) => {
  const texto = headline.toLowerCase();

  if (texto.includes('thunderstorm')) return 'Tempestade';
  if (texto.includes('storm')) return 'Tempestade';
  if (texto.includes('flood')) return 'Enchente';
  if (texto.includes('wind')) return 'Vento';
  if (texto.includes('snow')) return 'Neve';
  if (texto.includes('heat')) return 'Calor';
  if (texto.includes('cold')) return 'Frio';
  if (texto.includes('rain')) return 'Chuva';
  if (texto.includes('fog')) return 'Nevoeiro';

  return 'Alerta';
};

const cidades = [
  { nome: 'Amaral Ferrador', coord: '-30.873,-52.2473' },
  { nome: 'Arroio Grande', coord: '-32.2387,-53.0907' },
  { nome: 'Candiota', coord: '-31.4768,-53.6792' },
  { nome: 'Canguçu', coord: '-31.3956,-52.6864' },
  { nome: 'Capão do Leão', coord: '-31.7675,-52.4487' },
  { nome: 'Herval', coord: '-32.0129,-53.4031' },
  { nome: 'Jaguarão', coord: '-32.5602,-53.381' },
  { nome: 'Pedro Osório', coord: '-31.8797,-52.8104' },
  { nome: 'Pelotas', coord: '-31.768099,-52.341164' },
  { nome: 'Pedras Altas', coord: '-31.7325,-53.5849' },
  { nome: 'Pinheiro Machado', coord: '-31.578,-53.381' },
  { nome: 'Piratini', coord: '-31.4421,-53.1045' },
  { nome: 'Rio Grande', coord: '-32.0332,-52.0986' },
  { nome: 'São Lourenço do Sul', coord: '-31.3629,-51.9789' },
  { nome: 'Turuçu', coord: '-31.4292,-52.1859' },
];

const App = () => {
  const [weatherDataMap, setWeatherDataMap] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  const STORAGE_KEY = 'weatherDataMap';
  const TIMESTAMP_KEY = 'weatherDataTimestamp';

  const corrigirNome = (nome) => {
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
          `https://api.weatherapi.com/v1/forecast.json?key=34402a45e8a24b4194335812211910&q=${cidade.coord}&days=1&alerts=yes`,
        );
        const data = await res.json();

        const alertas = data.alerts?.alert || [];

        newWeatherDataMap[cidade.nome] = {
          nomeCorrigido: corrigirNome(data.location.name),
          temperatura: Math.round(Number(data.current.temp_c)),
          sensacao: Math.round(Number(data.current.feelslike_c)),
          icon: getLocalWeatherIcon(data.current.condition.text),
          alertas: alertas.map((alert) => ({
            titulo: alert.headline,
            descricao: alert.desc,
            urgencia: alert.urgency,
            categoria: alert.category,
            evento: alert.event,
            instrucao: alert.instruction,
          })),
        };
      } catch (err) {
        console.warn(`Erro ao buscar dados de ${cidade.nome}`, err);
      }
    }

    setWeatherDataMap(newWeatherDataMap);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newWeatherDataMap));
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
  };

  useEffect(() => {
    const loadData = () => {
      const cache = localStorage.getItem(STORAGE_KEY);
      const timestamp = parseInt(localStorage.getItem(TIMESTAMP_KEY), 10);

      const now = Date.now();
      const cacheIsValid = cache && timestamp && now - timestamp < 60000;

      if (cacheIsValid) {
        setWeatherDataMap(JSON.parse(cache));
      } else {
        fetchAllCitiesWeather();
      }
    };

    loadData();
    const refreshInterval = setInterval(fetchAllCitiesWeather, 60000);
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const cidadeInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cidades.length);
    }, 15000);

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
        {console.log('dados.alertas', dados.alertas)}
        {dados.alertas.length > 0 && (
          <InfoSectionAlert>
            <motion.div
              key={`alerta-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <GoAlert
                  style={{ fontSize: 20, marginRight: 6, marginTop: -3 }}
                />
                {traduzirAlerta(dados.alertas[0].titulo)}
              </div>
            </motion.div>
          </InfoSectionAlert>
        )}
      </Card>
    </AnimatePresence>
  );
};

export default App;
