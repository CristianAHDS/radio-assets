import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Square,
  GcWrapper,
  GcTop,
  GcBottom,
  TextContainer,
  TextContainerTop,
  TextMirror,
  TextMirrorBottom,
} from './let.styled.jsx';

const LetConexao = () => {
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
    const savedTop = localStorage.getItem('letTopText');
    const savedBottom = localStorage.getItem('letBottomText');

    if (savedTop) {
      setTopText(savedTop);
    } else {
      setTopText('EDITAR');
      localStorage.setItem('letTopText', 'EDITAR');
    }

    if (savedBottom) {
      setBottomText(savedBottom);
    } else {
      setBottomText('EDITAR');
      localStorage.setItem('letBottomText', 'EDITAR');
    }
  }, []);

  useEffect(() => {
    adjustWidth(mirrorTopRef, topRef, topText);
    localStorage.setItem('letTopText', topText);
  }, [topText]);

  useEffect(() => {
    adjustWidth(mirrorBottomRef, bottomRef, bottomText);
    localStorage.setItem('letBottomText', bottomText);
  }, [bottomText]);

  return (
    <Container>
      <Square />
      <GcWrapper>
        <GcTop>
          <TextMirror ref={mirrorTopRef} />
          <TextContainerTop
            ref={topRef}
            spellCheck="false"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
        </GcTop>

        <GcBottom>
          <TextMirrorBottom ref={mirrorBottomRef} />
          <TextContainer
            ref={bottomRef}
            spellCheck="false"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
        </GcBottom>
      </GcWrapper>
    </Container>
  );
};

export default LetConexao;
