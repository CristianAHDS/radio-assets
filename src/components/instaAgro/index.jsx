import { useState, useEffect, useRef } from 'react';
import {
  Container,
  GcTop,
  GcBottom,
  TextContainer,
  TextContainerTop,
  TextMirror,
  TextMirrorBottom,
} from './insta.styled.jsx';
import { FaInstagram } from 'react-icons/fa';

const InstaAgro = () => {
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
    const savedTop = localStorage.getItem('agroPinText');
    const savedBottom = localStorage.getItem('agroGcBottomText');

    if (savedTop) setTopText(savedTop);
    if (savedBottom) setBottomText(savedBottom);
  }, []);

  useEffect(() => {
    adjustWidth(mirrorTopRef, topRef, topText);
    localStorage.setItem('agroPinText', topText);
  }, [topText]);

  useEffect(() => {
    adjustWidth(mirrorBottomRef, bottomRef, bottomText);
    localStorage.setItem('agroGcBottomText', bottomText);
  }, [bottomText]);

  return (
    <Container>
      <GcTop>
        <FaInstagram style={{ color: '#fff', fontSize: 30, marginRight: 10 }} />
        <TextMirror ref={mirrorTopRef} />
        <TextContainerTop ref={topRef} spellCheck="false" value={'ahoradosul@'} />
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

export default InstaAgro;
