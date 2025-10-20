import {
  Container,
  LogoContainer,
  ClockContainer,
  Hora,
  SubContainer,
  LogoImage,
} from './styles.styled.jsx';

import { useState, useEffect } from 'react';

import Logo from './logo.png';

const NewClock = () => {
  const [hora, setHora] = useState('');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const atualizarHora = () => {
      const agora = new Date();
      const horaBrasilia = agora.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
      });

      setHora(horaBrasilia);

      // Ativa o alerta quando for 10:42
      if (horaBrasilia === '99:99') {
        setAlert(true);
      } else {
        setAlert(false);
      }
    };

    atualizarHora();
    const intervaloHora = setInterval(atualizarHora, 1000);

    return () => clearInterval(intervaloHora);
  }, []);
  return (
    <Container>
      <LogoContainer>
        
      </LogoContainer>
      <ClockContainer>
        <SubContainer>
          <strong>AO VIVO</strong> <Hora>{hora}</Hora>
        </SubContainer>
      </ClockContainer>
    </Container>
  );
};

export default NewClock;
