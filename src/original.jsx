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

import SoldEntreNuvens from './assets/sunCloud.png';

import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [temperaturaInteira, setTemperaturaInteira] = useState();
  const [sensacao, setSensacao] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

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
    }, 10000); // 10 segundos

    return () => clearInterval(cidadeInterval);
  }, []);

  useEffect(() => {
    const cidadeAtual = cidades[currentIndex];

    const fetchWeather = () => {
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
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <Card>
          <NameSection>
            {weatherData?.location.name === 'Olimpo'
              ? 'Pedro Osório'
              : weatherData?.location.name}
          </NameSection>
          <MidleSection>
            <Temp>{temperaturaInteira}ºC</Temp>
            <Icon>
              <IconImage src={SoldEntreNuvens} alt="tempo" />
            </Icon>
          </MidleSection>
          <InfoSection>
            <strong>Sensação:</strong>
            <div style={{ marginLeft: '10px' }}>{sensacao}ºC</div>
          </InfoSection>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
