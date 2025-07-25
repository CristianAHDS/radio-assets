import { useState, useEffect } from 'react';
import { Card, TopCard, CardLogos, Hora, LogoCard } from './clock.styled';

import AcordaZonaSul from './assets/Programas/PNG/ACORDA_ZONA_SUL.png';
import AcordaZonaSulPatrocionio1 from './assets/PATROCINIOS/ACORDA_ZONA_SUL/biscoitos-zeze-127368.png';
import AcordaZonaSulPatrocionio2 from './assets/PATROCINIOS/ACORDA_ZONA_SUL/sicredi-logo.png';

import { motion, AnimatePresence } from 'framer-motion';

const imagens = [
  { src: AcordaZonaSul, alt: 'Programa Acorda Zona Sul' },
  { src: AcordaZonaSulPatrocionio1, alt: 'Patrocínio Zezé' },
  { src: AcordaZonaSulPatrocionio2, alt: 'Patrocínio Sicredi' },
];

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

  useEffect(() => {
    const intervaloImagens = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagens.length);
    }, 10000);

    return () => clearInterval(intervaloImagens);
  }, []);

  return (
    <Card>
      <TopCard>
        AO VIVO <Hora>{hora}</Hora>
      </TopCard>
      <CardLogos>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <LogoCard src={imagens[index].src} alt={imagens[index].alt} />
          </motion.div>
        </AnimatePresence>
      </CardLogos>
    </Card>
  );
};

export default Clock;
