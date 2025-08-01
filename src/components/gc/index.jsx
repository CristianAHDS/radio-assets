import { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    const savedTop = localStorage.getItem('gcTopText');
    const savedBottom = localStorage.getItem('gcBottomText');

    if (savedTop) setTopText(savedTop);
    if (savedBottom) setBottomText(savedBottom);
  }, []);

  useEffect(() => {
    adjustWidth(mirrorTopRef, topRef, topText);
    localStorage.setItem('gcTopText', topText);
  }, [topText]);

  useEffect(() => {
    adjustWidth(mirrorBottomRef, bottomRef, bottomText);
    localStorage.setItem('gcBottomText', bottomText);
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
