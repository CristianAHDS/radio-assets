import { Container, Lower } from './corpoEMenteGravado.styled.jsx';
import ClockGravadoCorpoEMente from '../../components/clockGravadoCorpoEMente';
import TempoCorpoEMente from '../../components/tempoCorpoEMente';
import GcCorpoEMente from '../../components/gcCorpoEMente';
import PinCorpoEMente from '../../components/pinCorpoEMente';
import WhatsCorpoEMente from '../../components/whatsCorpoEMente';
import LowerCorpoEMente from '../../components/lowerCorpoEMente';

const CorpoEMenteGravado = () => {
  return (
    <Container>
      <ClockGravadoCorpoEMente />
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

export default CorpoEMenteGravado;
