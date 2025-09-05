import { useState, useEffect } from 'react';
import { Card, TopCard, CardLogos, Hora, Logo} from './clock.styled.jsx';

const Gravado = () => {
  const [hora, setHora] = useState('');
  const [index, setIndex] = useState(0);
  const logoImage = 'https://i.imgur.com/gXyrBvU.gif';

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
        CONTEÚDO GRAVADO <Hora><Logo src={logoImage} alt="Logo" /></Hora>
      </TopCard>
      {/*<CardLogos></CardLogos>*/}
    </Card>
  );
};

export default Gravado;
