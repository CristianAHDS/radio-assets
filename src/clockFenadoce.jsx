import { useState, useEffect } from 'react';
import { Card, TopCard, CardLogos, Hora } from './clockFenadoce.styled.jsx';

const Clock = () => {
  const [hora, setHora] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const atualizarHora = () => {
      const agora = new Date();
      const horaBrasilia = agora.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
      });
      setHora(horaBrasilia);
    };

    atualizarHora();
    const intervaloHora = setInterval(atualizarHora, 1000);

    return () => clearInterval(intervaloHora);
  }, []);

  return (
    <Card>
      <TopCard>
        AO VIVO <Hora>{hora}</Hora>
      </TopCard>
      <CardLogos></CardLogos>
    </Card>
  );
};

export default Clock;
