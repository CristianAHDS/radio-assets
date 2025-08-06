import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  GcTop,
  GcBottom,
  TextContainer,
  TextContainerTop,
  TextMirror,
  TextMirrorBottom,
  Logo,
} from './gc.styled.jsx';

const Gc = () => {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get('nome'); // pega ?nome=XXX

  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const mirrorTopRef = useRef(null);
  const topRef = useRef(null);
  const mirrorBottomRef = useRef(null);
  const bottomRef = useRef(null);

  const adjustWidth = (mirrorRef, inputRef, text) => {
    if (mirrorRef.current && inputRef.current) {
      mirrorRef.current.textContent = text || ' ';
      inputRef.current.style.width = mirrorRef.current.offsetWidth + 'px';
    }
  };

  // Carrega valor inicial
  useEffect(() => {
    const savedTop = localStorage.getItem('gcTopText');
    const savedBottom = localStorage.getItem('gcBottomText');

    if (nome && nome.trim() !== '') {
      setTopText(nome.toUpperCase());
      localStorage.setItem('gcTopText', nome.toUpperCase());
    } else if (savedTop && savedTop.trim() !== '') {
      setTopText(savedTop);
    } else {
      setTopText('EDITAR');
      localStorage.setItem('gcTopText', 'EDITAR');
    }

    if (savedBottom && savedBottom.trim() !== '') {
      setBottomText(savedBottom);
    } else {
      setBottomText('EDITAR');
      localStorage.setItem('gcBottomText', 'EDITAR');
    }
  }, [nome]);

  useEffect(() => {
    adjustWidth(mirrorTopRef, topRef, topText);
    if (topText && topText.trim() !== '') {
      localStorage.setItem('gcTopText', topText);
    }
  }, [topText]);

  useEffect(() => {
    adjustWidth(mirrorBottomRef, bottomRef, bottomText);
    if (bottomText && bottomText.trim() !== '') {
      localStorage.setItem('gcBottomText', bottomText);
    }
  }, [bottomText]);

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

      {/* Se quiser reativar o bottom */}
      {/*
      <GcBottom>
        <TextMirrorBottom ref={mirrorBottomRef} />
        <TextContainer
          ref={bottomRef}
          spellCheck="false"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
      </GcBottom>
      */}
    </Container>
  );
};

export default Gc;
