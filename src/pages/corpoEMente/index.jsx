import { Container, Lower } from './corpoEMente.styled.jsx';
import ClockCorpoEMente from '../../components/clockCorpoEMente';
import TempoCorpoEMente from '../../components/tempoCorpoEMente';
import GcCorpoEMente from '../../components/gcCorpoEMente';
import PinCorpoEMente from '../../components/pinCorpoEMente';
import WhatsCorpoEMente from '../../components/whatsCorpoEMente';
import InstaCorpoEMente from '../../components/InstaCorpoEMente';
import LowerCorpoEMente from '../../components/lowerCorpoEMente';

const Esportes = () => {
  return (
    <Container>
      <ClockCorpoEMente />
      <TempoCorpoEMente />
      <GcCorpoEMente />
      <PinCorpoEMente />
      <WhatsCorpoEMente />

      <Lower>
        <LowerCorpoEMente />
      </Lower>
    </Container>
  );
};

export default Esportes;
