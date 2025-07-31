import { useState, useEffect, useRef } from 'react';
import {
  Container,
  TextContainer,
  LeftSide,
  TextSide,
  ScrollingWrapper,
} from './lowerPensarNegocios.styled.jsx';

const Lower = () => {
  const defaultText = 'Edit';
  const [text, setText] = useState(() => {
    return localStorage.getItem('lowerText') || defaultText;
  });

  const [animationDuration, setAnimationDuration] = useState(30);
  const measureRef = useRef(null);
  const contentRef = useRef(null);

  // Salva texto puro no localStorage
  useEffect(() => {
    localStorage.setItem('lowerText', text);
  }, [text]);

  // Recalcula largura e duração com base no texto bruto
  useEffect(() => {
    if (measureRef.current) {
      const measuredWidth = measureRef.current.offsetWidth;
      const speed = 150;
      const duration = Math.max(15, measuredWidth / speed);
      setAnimationDuration(duration);
    }
  }, [text]);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // impede o comportamento padrão

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // Cria um nó de texto com tab (você pode trocar para '  ' se preferir dois espaços)
      const tabNode = document.createTextNode('    '); // 4 espaços

      // Insere o nó de texto no local do cursor
      range.insertNode(tabNode);

      // Move o cursor após os espaços inseridos
      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      selection.removeAllRanges();
      selection.addRange(range);

      // Atualiza o state
      setText(contentRef.current.textContent);
    }
  };

  // Função que converte *texto* em <strong>texto</strong>
  const formatText = (input) => {
    const parts = input.split(/(\*[^*]+\*)/g); // pega *palavra*
    return parts
      .map((part) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          const boldText = part.slice(1, -1);
          return `<strong>${boldText}</strong>`;
        }
        return part;
      })
      .join('');
  };

  // Trata input do usuário
  const handleInput = (e) => {
    const rawText = e.currentTarget.textContent;
    setText(rawText);
  };

  // Atualiza HTML sempre que o texto muda
  useEffect(() => {
    if (contentRef.current) {
      const html = formatText(text);
      contentRef.current.innerHTML = html;
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
            <div
              ref={contentRef}
              contentEditable
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              style={{
                marginTop: 12,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                outline: 'none',
                border: 'none',
                fontSize: '18px',
                fontWeight: 400,
                textTransform: 'uppercase',
                fontFamily: 'inherit',
                color: '#fff',
              }}
            />
          </ScrollingWrapper>
        </TextSide>
      </TextContainer>
    </Container>
  );
};

export default Lower;
