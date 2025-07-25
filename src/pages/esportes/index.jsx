import { Container } from './esportes.styled.jsx';

import LowerEsporte from '../../lowerEsporte.jsx';
import ClockEsporte from '../../clockEsporte.jsx';
import Esporte from '../../esporte.jsx';

const Esportes = () => {
  return (
    <Container>
      <div style={{ position: 'fixed', top: '60px', left: '38px' }}>
        <Esporte />
      </div>
      <div style={{ position: 'fixed', bottom: '110px', left: '38px' }}>
        <ClockEsporte />
      </div>
      <div style={{ position: 'fixed', bottom: '0px' }}>
        <LowerEsporte />
      </div>
    </Container>
  );
};

export default Esportes;
