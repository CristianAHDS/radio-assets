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
} from './app.styled';

import SolEntreNuvens from './assets/sunCloud.png';
import Sol from './assets/sun.png';
import Nublado from './assets/cloud.png';
import SolEChuva from './assets/sunRain.png';
import Chuva from './assets/rain.png';

import { motion, AnimatePresence } from 'framer-motion';

// Mapeia condição textual para imagem local
const getLocalWeatherIcon = (conditionText) => {
  const text = conditionText.toLowerCase();

  if (text.includes('sunny')) return Sol;
  if (text.includes('partly') || text.includes('cloudy')) return SolEntreNuvens;
  if (text.includes('overcast') || text === 'cloudy') return Nublado;
  if (text.includes('rain') && text.includes('sun')) return SolEChuva;
  if (text.includes('rain')) return Chuva;

  return Nublado; // fallback
};

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [temperaturaInteira, setTemperaturaInteira] = useState();
  const [sensacao, setSensacao] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nome, setNome] = useState(null);
  const [icon, setIcon] = useState(null);

  const cidades = [
    { nome: 'Pelotas', coord: '-31.768099,-52.341164' },
    { nome: 'Rio Grande', coord: '-32.0332,-52.0986' },
    { nome: 'Canguçu', coord: '-31.3956,-52.6864' },
    { nome: 'São Lourenço do Sul', coord: '-31.3629,-51.9789' },
    { nome: 'São Vicente do Sul', coord: '-33.5338,-53.3496' },
    { nome: 'Piratini', coord: '-31.4421,-53.1045' },
    { nome: 'Jaguarão', coord: '-32.5602,-53.381' },
    { nome: 'Pedro Osório', coord: '-31.8797,-52.8104' },
    { nome: 'Pinheiro Machado', coord: '-31.578,-53.381' },
    { nome: 'Arroio Grande', coord: '-32.2387,-53.0907' },
  ];

  useEffect(() => {
    const cidadeInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cidades.length);
    }, 6000); // 6 segundos

    return () => clearInterval(cidadeInterval);
  }, []);

  useEffect(() => {
    const cidadeAtual = cidades[currentIndex];

    const fetchWeather = () => {
      setNome('');
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=34402a45e8a24b4194335812211910&q=${cidadeAtual.coord}&aqi=yes`,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
          setTemperaturaInteira(Math.round(Number(data.current.temp_c)));
          setSensacao(Math.round(Number(data.current.feelslike_c)));
          setNome(data.location.name);
          setIcon(getLocalWeatherIcon(data.current.condition.text)); // ícone local
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchWeather();
  }, [currentIndex]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <AnimatePresence mode="wait">
      <Card>
        <NameSection>
          <motion.div
            key={`name-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {nome === 'Olimpo'
              ? 'Pedro Osório'
              : nome === 'Cangucu'
              ? 'Canguçu'
              : nome === 'Santa Vitoria Do Palmar'
              ? 'Sta. Vitoria do Palmar'
              : nome === 'Jaguarao'
              ? 'Jaguarão'
              : nome}
          </motion.div>
        </NameSection>

        <MidleSection>
          <Temp>
            <motion.div
              style={{ width: '70%' }}
              key={`temp-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {temperaturaInteira}ºC
            </motion.div>
          </Temp>

          <Icon>
            <motion.div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={`icon-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <IconImage src={icon} alt="tempo" />
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
            <div style={{ marginLeft: '10px' }}>{sensacao}ºC</div>
          </motion.div>
        </InfoSection>
      </Card>
    </AnimatePresence>
  );
};

export default App;
