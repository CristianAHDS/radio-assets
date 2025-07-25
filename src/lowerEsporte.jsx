import { useState, useEffect } from 'react';
import {
  Container,
  TextContainer,
  LeftSide,
  TextSide,
  ScrollingWrapper,
  ScrollingText,
} from './lowerEsporte.styled';

const Lower = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchText = () => {
      fetch('https://corsproxy.io/?https://pastebin.com/raw/Az7qixiV')
        .then((res) => res.text())
        .then((data) => setText(data))
        .catch((err) => console.error('Erro ao buscar o texto:', err));
    };

    fetchText();
    const interval = setInterval(fetchText, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <TextContainer>
        <LeftSide>ahoradosul.com.br</LeftSide>
        <TextSide>
          <ScrollingWrapper>
            <ScrollingText>{text}</ScrollingText>
            <ScrollingText>{text}</ScrollingText>
          </ScrollingWrapper>
        </TextSide>
      </TextContainer>
    </Container>
  );
};

export default Lower;
