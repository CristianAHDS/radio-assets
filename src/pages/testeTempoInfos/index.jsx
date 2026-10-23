import { Container, Lower } from './testeTempoInfos.styled.jsx';
import ClockOutros from '../../clock.jsx';
import TempoOutros from '../../geral.jsx';
import TempoInfosNewDefault from '../../components/newDefault/TempoInfos';
import GcOutros from '../../components/gc';
import PinOutros from '../../components/pin';
import WhatsOutros from '../../components/whats';
import LowerOutros from '../../lower.jsx';

const TesteTempoInfos = () => {
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

export default TesteTempoInfos;