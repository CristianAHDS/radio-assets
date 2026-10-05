import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  TextContainer,
  VetorialSide,
  Logo,
  LocateText,
} from './cam.styled.jsx';
import { FaLocationDot } from 'react-icons/fa6';

const Gc = () => {
  const VetorialLogo = 'https://i.imgur.com/L6wrorn.png';
  const [searchParams] = useSearchParams();
  const local = searchParams.get('local');

  const [topText, setTopText] = useState('');
  const [fromUrl, setFromUrl] = useState(false);

  const mirrorTopRef = useRef(null);
  const topRef = useRef(null);

  const adjustWidth = (mirrorRef, inputRef, text) => {
    if (mirrorRef.current && inputRef.current) {
      mirrorRef.current.textContent = text || ' ';
      inputRef.current.style.width = mirrorRef.current.offsetWidth + 'px';
    }
  };

  useEffect(() => {
    const savedTop = localStorage.getItem('agroTpLocal');

    if (local && local.trim() !== '') {
      setTopText(local.toUpperCase());
      setFromUrl(true);
    } else if (savedTop && savedTop.trim() !== '') {
      setTopText(savedTop);
    } else {
      setTopText('EDITAR');
      localStorage.setItem('agroTpLocal', 'EDITAR');
    }
  }, [local]);

  useEffect(() => {
    adjustWidth(mirrorTopRef, topRef, topText);
    if (!fromUrl && topText && topText.trim() !== '') {
      localStorage.setItem('agroTpLocal', topText);
    }
  }, [topText, fromUrl]);

  return (
    <Container>
      <TextContainer>
        <VetorialSide>
          <Logo src={VetorialLogo} alt="Vetorial" />
        </VetorialSide>
        <LocateText>
          <FaLocationDot
            style={{ color: '#fff', fontSize: 26, marginRight: 10 }}
          />
          {topText}
        </LocateText>
      </TextContainer>
    </Container>
  );
};

export default Gc;
