import { Container, Lower } from './corpoEMente.styled.jsx';
import ClockOutros from '../../clockEsporte.jsx';
import TempoOutros from '../../esporte.jsx';
import TempoInfosNewDefault from '../../components/newDefault/TempoInfos';
import GcOutros from '../../components/gcEsporte';
import PinOutros from '../../components/pinEsporte';
import WhatsOutros from '../../components/whatsEsporte';

import LowerOutros from '../../lowerEsporte.jsx';

const Esportes = () => {
  return (
    <Container>
      <ClockOutros />
      <TempoOutros />
      <TempoInfosNewDefault />
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
