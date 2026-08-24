import { useState, useEffect } from 'react';
import { Card, TopCard, Hora } from '../clockCorpoEMente/clockConexao.styled.jsx';

const ClockGravadoCorpoEMente = () => {
  const [hora, setHora] = useState('');

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
        GRAVADO <Hora>{hora}</Hora>
      </TopCard>
    </Card>
  );
};

export default ClockGravadoCorpoEMente;
