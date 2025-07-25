import { Container } from './fenadoce.styled.jsx';

import LowerFenadoce from '../../lowerFenadoce.jsx';
import ClockFenadoce from '../../clockFenadoce.jsx';
import Fenadoce from '../../fenadoce.jsx';

const Esportes = () => {
  return (
    <Container>
      <div style={{ position: 'fixed', top: '60px', left: '38px' }}>
        <Fenadoce />
      </div>
      <div style={{ position: 'fixed', bottom: '110px', left: '38px' }}>
        <ClockFenadoce />
      </div>
      <div style={{ position: 'fixed', bottom: '0px' }}>
        <LowerFenadoce />
      </div>
    </Container>
  );
};

export default Esportes;
