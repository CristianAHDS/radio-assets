import { useState, useEffect, useRef } from 'react';
import {
  Container,
  GcTop,
  TextMirror,
  TextContainerTop,
} from './pin.styled.jsx';
import { LuMapPinCheckInside } from 'react-icons/lu';

const Pin = () => {
  const [topText, setTopText] = useState('');

  const mirrorTopRef = useRef(null);
  const topRef = useRef(null);

  const adjustWidth = (mirrorRef, inputRef, text) => {
    if (mirrorRef.current && inputRef.current) {
      mirrorRef.current.textContent = text || ' ';
      inputRef.current.style.width = mirrorRef.current.offsetWidth + 'px';
    }
  };

  useEffect(() => {
    const savedTop = localStorage.getItem('pinText');

    if (savedTop) setTopText(savedTop);
  }, []);

  useEffect(() => {
    adjustWidth(mirrorTopRef, topRef, topText);
    localStorage.setItem('pinText', topText);
  }, [topText]);

  return (
    <Container>
      <GcTop>
        <LuMapPinCheckInside
          style={{ color: '#fff', fontSize: 30, marginRight: 10 }}
        />
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

export default Pin;
