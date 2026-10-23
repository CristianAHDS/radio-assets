import { Container, Lower } from './corpoEMente.styled.jsx';
import ClockOutros from '../../components/clockOutros';
import TempoOutros from '../../components/tempoOutros';
import TempoInfosNewDefault from '../../components/newDefault/TempoInfos';
import GcOutros from '../../components/gcOutros';
import PinOutros from '../../components/pinOutros';
import WhatsOutros from '../../components/whatsOutros';
import LowerOutros from '../../components/lowerOutros';

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
