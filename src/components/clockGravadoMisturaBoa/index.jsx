import { useState, useEffect } from 'react';
import {
  Container,
  LogoContainer,
  ClockContainer,
  Hora,
  SubContainer,
  LogoImage,
} from '../newVersion/ClockNewVersion/styles.styled.jsx';

import Logo from '../newVersion/ClockNewVersion/logo.png';

const ClockGravadoMisturaBoa = () => {
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
    <Container>
      <LogoContainer>
        <LogoImage src={Logo} />
      </LogoContainer>
      <ClockContainer>
        <SubContainer>
          <strong>GRAVADO</strong> <Hora>{hora}</Hora>
        </SubContainer>
      </ClockContainer>
    </Container>
  );
};

export default ClockGravadoMisturaBoa;
