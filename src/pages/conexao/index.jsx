import { Container, Lower } from './corpoEMente.styled.jsx';
import ClockOutros from '../../clockConexao';
import TempoOutros from '../../conexao.jsx';
import GcOutros from '../../components/gcConexao';
import PinOutros from '../../components/pinConexao';
import WhatsOutros from '../../components/whatsConexao';
import InstaCorpoEMente from '../../components/InstaCorpoEMente';
import LowerOutros from '../../lowerConexao.jsx';

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
