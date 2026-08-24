import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  GcTop,
  TextMirror,
  TextContainerTop,
  Logo,
} from './gc.styled.jsx';

const Gc = () => {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get('nome');

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
    const savedTop = localStorage.getItem('gcMusic');

    if (nome && nome.trim() !== '') {
      setTopText(nome.toUpperCase());
      setFromUrl(true);
    } else if (savedTop && savedTop.trim() !== '') {
      setTopText(savedTop);
    } else {
      setTopText('EDITAR');
      localStorage.setItem('gcMusic', 'EDITAR');
    }
  }, [nome]);

  useEffect(() => {
    adjustWidth(mirrorTopRef, topRef, topText);
    if (!fromUrl && topText && topText.trim() !== '') {
      localStorage.setItem('gcMusic', topText);
    }
  }, [topText, fromUrl]);

  const logoImage = 'https://i.imgur.com/gXyrBvU.gif';

  return (
    <Container>
      <GcTop>
        <Logo src={logoImage} alt="Logo" />
        <TextMirror ref={mirrorTopRef} />
        <TextContainerTop
          ref={topRef}
          spellCheck="false"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
      </GcTop>
    </Container>
  );
};

export default Gc;
