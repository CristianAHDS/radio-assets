import { useState, useEffect, useLayoutEffect, useRef } from 'react';
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

const LetTest = ({ primaryColor, topBoxColor, storageKey = 'letTest' }) => {
  const topKey = `${storageKey}TopText`;
  const bottomKey = `${storageKey}BottomText`;
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
      localStorage.setItem(topKey, nome.toUpperCase());
    } else {
      const savedTop = localStorage.getItem(topKey);
      setTopText(savedTop && savedTop.trim() !== '' ? savedTop : 'EDITAR');
    }

    if (sub && sub.trim() !== '') {
      setBottomText(sub.toUpperCase());
      localStorage.setItem(bottomKey, sub.toUpperCase());
    } else {
      const savedBottom = localStorage.getItem(bottomKey);
      setBottomText(
        savedBottom && savedBottom.trim() !== '' ? savedBottom : 'EDITAR',
      );
    }
  }, [nome, sub, topKey, bottomKey]);

  useEffect(() => {
    if (topText && topText.trim() !== '') {
      localStorage.setItem(topKey, topText);
    }
  }, [topText, topKey]);

  useEffect(() => {
    if (bottomText && bottomText.trim() !== '') {
      localStorage.setItem(bottomKey, bottomText);
    }
  }, [bottomText, bottomKey]);

  useLayoutEffect(() => {
    const containerWidth = containerRef.current?.clientWidth || innerWidth;

    const applyFit = (text, base, min, mirror, input, setWidth) => {
      if (!mirror.current || !input.current) return;

      const maxWidth = Math.max(containerWidth - HORIZONTAL_PADDING, 200);
      let size = charFontSize(base, min, text);

      mirror.current.style.fontSize = `${size}px`;
      mirror.current.textContent = text || ' ';

      const textWidth = mirror.current.offsetWidth;
      if (textWidth > maxWidth && textWidth > 0) {
        size = Math.max(size * (maxWidth / textWidth), min);
      }

      input.current.style.fontSize = `${size}px`;
      if (setWidth) {
        input.current.style.width = `${mirror.current.offsetWidth}px`;
      }

      if (input.current.scrollWidth > input.current.clientWidth + 1 && input.current.clientWidth > 0) {
        const scale = input.current.clientWidth / input.current.scrollWidth;
        size = Math.max(size * scale, min);
        input.current.style.fontSize = `${size}px`;
      }
    };

    applyFit(topText, TOP_BASE, TOP_MIN, mirrorTopRef, topRef, true);
    applyFit(bottomText, BOTTOM_BASE, BOTTOM_MIN, mirrorBottomRef, bottomRef, false);
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
