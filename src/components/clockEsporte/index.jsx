import { useState, useEffect } from 'react';
import { Card, TopCard, CardLogos, Hora } from './clockEsporte.styled.jsx';
import Alert from './components/alerts';

const Clock = () => {
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
    <Card>
      <TopCard>
        {alert ? (
          <Alert text={`Alerta ativado às ${hora}`} />
        ) : (
          <>
            AO VIVO <Hora>{hora}</Hora>
          </>
        )}
      </TopCard>
      <CardLogos />
    </Card>
  );
};

export default Clock;
