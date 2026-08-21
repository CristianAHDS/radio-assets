import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import {
  Container,
  TopBox,
  TextMirror,
  TextMirrorBottom,
  TopContainer,
  BottomContainer,
} from './let.styled.jsx';

const LetTestGlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    display: block;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  #root {
    width: 100%;
  }
`;

const TOP_KEY = 'letTestTopText';
const BOTTOM_KEY = 'letTestBottomText';
const MAX_CHARS = 50;
const HORIZONTAL_PADDING = 80;
const TOP_BASE = 30;
const TOP_MIN = 16;
const BOTTOM_BASE = 48;
const BOTTOM_MIN = 20;

const charFontSize = (base, min, text) =>
  text.length > MAX_CHARS
    ? Math.max((base * MAX_CHARS) / text.length, min)
    : base;

const LetTest = ({ primaryColor, topBoxColor }) => {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get('nome');
  const sub = searchParams.get('sub');

  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const containerRef = useRef(null);
  const mirrorTopRef = useRef(null);
  const topRef = useRef(null);
  const mirrorBottomRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const onResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setInnerWidth(containerRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (nome && nome.trim() !== '') {
      setTopText(nome.toUpperCase());
      localStorage.setItem(TOP_KEY, nome.toUpperCase());
    } else {
      const savedTop = localStorage.getItem(TOP_KEY);
      setTopText(savedTop && savedTop.trim() !== '' ? savedTop : 'EDITAR');
    }

    if (sub && sub.trim() !== '') {
      setBottomText(sub.toUpperCase());
      localStorage.setItem(BOTTOM_KEY, sub.toUpperCase());
    } else {
      const savedBottom = localStorage.getItem(BOTTOM_KEY);
      setBottomText(
        savedBottom && savedBottom.trim() !== '' ? savedBottom : 'EDITAR',
      );
    }
  }, [nome, sub]);

  useEffect(() => {
    if (topText && topText.trim() !== '') {
      localStorage.setItem(TOP_KEY, topText);
    }
  }, [topText]);

  useEffect(() => {
    if (bottomText && bottomText.trim() !== '') {
      localStorage.setItem(BOTTOM_KEY, bottomText);
    }
  }, [bottomText]);

  useEffect(() => {
    const applyFit = (text, base, min, mirror, input) => {
      if (!mirror.current || !input.current) return;

      const maxWidth = Math.max(innerWidth - HORIZONTAL_PADDING, 200);
      let size = charFontSize(base, min, text);

      mirror.current.style.fontSize = `${size}px`;
      mirror.current.textContent = text || ' ';

      const textWidth = mirror.current.offsetWidth;
      if (textWidth > maxWidth && textWidth > 0) {
        size = Math.max(size * (maxWidth / textWidth), min);
        mirror.current.style.fontSize = `${size}px`;
      }

      mirror.current.textContent = text || ' ';
      input.current.style.fontSize = `${size}px`;
      input.current.style.width = `${mirror.current.offsetWidth}px`;
    };

    applyFit(topText, TOP_BASE, TOP_MIN, mirrorTopRef, topRef);
    applyFit(bottomText, BOTTOM_BASE, BOTTOM_MIN, mirrorBottomRef, bottomRef);
  }, [topText, bottomText, innerWidth]);

  return (
    <>
      <LetTestGlobalStyle />
      <Container ref={containerRef} $bg={primaryColor}>
        <TopBox $bg={topBoxColor}>
          <TextMirror ref={mirrorTopRef} />
          <TopContainer
            ref={topRef}
            spellCheck="false"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
        </TopBox>
        <TextMirrorBottom ref={mirrorBottomRef} />
        <BottomContainer
          ref={bottomRef}
          spellCheck="false"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
      </Container>
    </>
  );
};

export default LetTest;
