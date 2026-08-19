import { useState, useEffect, useRef } from 'react';
import {
  Container,
  TextContainer,
  TextSide,
  LeftSide,
  ScrollingWrapper,
} from '../../lower.styled';

const NEWS_URL = `${window.location.origin}/.netlify/functions/news`;
const STORAGE_KEY = 'lowerTesteText';

const joinTitles = (titles) => `${titles.map((t) => `  ${t}  `).join('•')} •`;

const LowerTeste = () => {
  const [text, setText] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'Carregando notícias do portal...';
  });
  const [animationDuration, setAnimationDuration] = useState(30);
  const measureRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    fetch(NEWS_URL)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data && Array.isArray(data.titles) && data.titles.length > 0) {
          const joined = joinTitles(data.titles);
          setText(joined);
          localStorage.setItem(STORAGE_KEY, joined);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setText(
            localStorage.getItem(STORAGE_KEY) ||
              'Notícias indisponíveis - clique e edite',
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (measureRef.current) {
      const measuredWidth = measureRef.current.offsetWidth;
      const speed = 150;
      const duration = Math.max(15, measuredWidth / speed);
      setAnimationDuration(duration);
    }
  }, [text]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.textContent = text;
    }
  }, [text]);

  return (
    <Container>
      <TextContainer>
        <TextSide>
          <span
            ref={measureRef}
            style={{
              position: 'absolute',
              visibility: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: 20,
              fontWeight: 400,
              textTransform: 'uppercase',
              paddingRight: '100px',
              fontFamily: 'inherit',
            }}
          >
            {text}
          </span>

          <ScrollingWrapper animationDuration={animationDuration}>
            <div
              ref={contentRef}
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              style={{
                marginTop: 9,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                outline: 'none',
                border: 'none',
                fontSize: '22px',
                fontWeight: 400,
                textTransform: 'uppercase',
                fontFamily: 'inherit',
                color: '#fff',
              }}
            />
          </ScrollingWrapper>
        </TextSide>
        <LeftSide>Últimas</LeftSide>
      </TextContainer>
    </Container>
  );
};

export default LowerTeste;