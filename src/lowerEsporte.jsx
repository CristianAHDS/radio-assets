import { useState, useEffect, useRef } from 'react';
import {
  Container,
  TextContainer,
  LeftSide,
  TextSide,
  ScrollingWrapper,
  ScrollingText,
} from './lowerEsporte.styled';

const Lower = () => {
  const defaultText = 'Edit';

  const [text, setText] = useState(() => {
    // tenta carregar do localStorage ou usa o padrão
    return localStorage.getItem('lowerText') || defaultText;
  });

  const [secondText, setSecondText] = useState('');
  const [textWidth, setTextWidth] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(30);

  const measureRef = useRef(null);

  // Sempre que o texto mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem('lowerText', text);
    setSecondText(text);
  }, [text]);

  // Recalcula largura e duração
  useEffect(() => {
    if (measureRef.current) {
      const measuredWidth = measureRef.current.offsetWidth;
      setTextWidth(measuredWidth + 50);

      const speed = 150; // pixels por segundo
      const duration = Math.max(15, measuredWidth / speed);
      setAnimationDuration(duration);
    }
  }, [text]);

  return (
    <Container>
      <TextContainer>
        <LeftSide>ahoradosul.com.br</LeftSide>
        <TextSide>
          {/* invisível para medir */}
          <span
            ref={measureRef}
            style={{
              position: 'absolute',
              visibility: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: 18,
              fontWeight: 400,
              textTransform: 'uppercase',
              paddingRight: '100px',
              fontFamily: 'inherit',
            }}
          >
            {text}
          </span>

          <ScrollingWrapper animationDuration={animationDuration}>
            <ScrollingText
              spellcheck="false"
              width={textWidth}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <ScrollingText
              width={textWidth}
              value={secondText}
              spellcheck="false"
              onChange={(e) => setText(e.target.value)}
            />
          </ScrollingWrapper>
        </TextSide>
      </TextContainer>
    </Container>
  );
};

export default Lower;
