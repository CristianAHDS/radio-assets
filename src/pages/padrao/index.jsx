import { Container, Lower } from './corpoEMente.styled.jsx';
import ClockOutros from '../../clock.jsx';
import TempoOutros from '../../geral.jsx';
import GcOutros from '../../components/gc';
import PinOutros from '../../components/pin';
import WhatsOutros from '../../components/whats';
import InstaCorpoEMente from '../../components/InstaCorpoEMente';
import LowerOutros from '../../lower.jsx';

const Esportes = () => {
  return (
    <Container>
      <ClockOutros />
      <TempoOutros />
      <GcOutros />
      <PinOutros />
      <WhatsOutros />

      <Lower>
        <LowerOutros />
      </Lower>
    </Container>
  );
};

export default Esportes;
