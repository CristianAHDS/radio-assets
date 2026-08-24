import {
  Container,
  GcTop,
  TextMirror,
  TextContainerTop,
} from './whats.styled.jsx';
import { FaWhatsapp } from 'react-icons/fa';

const Whats = () => {
  return (
    <Container>
      <GcTop>
        <FaWhatsapp style={{ color: '#fff', fontSize: 30 }} />
        <TextMirror />
        <TextContainerTop spellCheck="false" value={'PARTICIPE PELO : 99950.0995'} />
      </GcTop>
    </Container>
  );
};

export default Whats;
