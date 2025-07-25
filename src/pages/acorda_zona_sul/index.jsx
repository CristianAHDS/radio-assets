import { Container } from './acorda_zona_sul.styled.jsx';

import Lower from '../../lower.jsx';
import Clock from '../../clock.jsx';
import Geral from '../../geral.jsx';

const AcordaZonaSul = () => {
  return (
    <Container>
      <div style={{ position: 'fixed', top: '60px', left: '38px' }}>
        <Geral />
      </div>
      <div style={{ position: 'fixed', bottom: '110px', left: '38px' }}>
        <Clock />
      </div>
      <div style={{ position: 'fixed', bottom: '0px' }}>
        <Lower />
      </div>
    </Container>
  );
};

export default AcordaZonaSul;
