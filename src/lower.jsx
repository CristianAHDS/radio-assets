import { useState, useEffect, useRef } from 'react';
import {
  Container,
  TextContainer,
  LeftSide,
  TextSide,
  ScrollingWrapper,
  ScrollingText,
} from './lower.styled';

const Lower = () => {
  const [text, setText] = useState('EDITAR TEXT');
  const [secondText, setSecondText] = useState('');

  // Estado para largura do textarea e duração da animação
  const [textWidth, setTextWidth] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(30);

  // Ref para o elemento invisível que mede o texto
  const measureRef = useRef(null);

  useEffect(() => {
    setSecondText(text);
  }, [text]);

  // Sempre que o texto mudar, atualiza a largura e duração
  useEffect(() => {
    if (measureRef.current) {
      const measuredWidth = measureRef.current.offsetWidth;
      setTextWidth(measuredWidth + 50); // folga para padding

      // Calcula duração proporcional (exemplo: 10s para cada 100px)
      const duration = Math.max(1, (measuredWidth / 10000) * 10);
      setAnimationDuration(duration);
    }
  }, [text]);

  return (
    <Container>
      <TextContainer>
        <LeftSide>ahoradosul.com.br</LeftSide>
        <TextSide>
          {/* Elemento invisível para medir texto */}
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

          {/* Passa duration para animação e width para textarea */}
          <ScrollingWrapper animationDuration={animationDuration}>
            <ScrollingText
              width={textWidth}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <ScrollingText
              width={textWidth}
              value={secondText}
              onChange={(e) => setText(e.target.value)}
            />
          </ScrollingWrapper>
        </TextSide>
      </TextContainer>
    </Container>
  );
};

export default Lower;
