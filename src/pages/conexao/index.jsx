import { Container, Lower } from './corpoEMente.styled.jsx';
import ClockOutros from '../../clockConexao';
import TempoOutros from '../../conexao.jsx';
import TempoInfosNewDefault from '../../components/newDefault/TempoInfos';
import GcOutros from '../../components/gcConexao';
import PinOutros from '../../components/pinConexao';
import WhatsOutros from '../../components/whatsConexao';
import LowerOutros from '../../lowerConexao.jsx';

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
