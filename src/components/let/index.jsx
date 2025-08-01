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

const Let = () => {
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

    if (savedTop) {
      setTopText(savedTop);
    } else {
      setTopText('EDITAR');
      localStorage.setItem('gcTopText', 'EDITAR');
    }

    if (savedBottom) {
      setBottomText(savedBottom);
    } else {
      setBottomText('EDITAR');
      localStorage.setItem('gcBottomText', 'EDITAR');
    }
  }, []);

  useEffect(() => {
    adjustWidth(mirrorTopRef, topRef, topText);
    localStorage.setItem('gcTopText', topText);
  }, [topText]);

  useEffect(() => {
    adjustWidth(mirrorBottomRef, bottomRef, bottomText);
    localStorage.setItem('gcBottomText', bottomText);
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

export default Let;
