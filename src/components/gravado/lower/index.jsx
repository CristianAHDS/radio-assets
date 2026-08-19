import { useState, useEffect, useRef } from 'react';
import {
  Container,
  TextContainer,
  LeftSide,
  TextSide,
  ScrollingWrapper,
} from '../../../lower.styled';

const Lower = () => {
  const defaultText = 'Edit';
  const [text, setText] = useState(() => {
    return localStorage.getItem('lowerText') || defaultText;
  });

  const [animationDuration, setAnimationDuration] = useState(30);
  const measureRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('lowerText', text);
  }, [text]);

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
      e.preventDefault();

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      const tabNode = document.createTextNode('    ');

      range.insertNode(tabNode);

      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      selection.removeAllRanges();
      selection.addRange(range);

      setText(contentRef.current.textContent);
    }
  };

  const formatText = (input) => {
    const parts = input.split(/(\*[^*]+\*)/g);
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

  const handleInput = (e) => {
    const rawText = e.currentTarget.textContent;
    setText(rawText);
  };

  useEffect(() => {
    if (contentRef.current) {
      const html = formatText(text);
      contentRef.current.innerHTML = html;
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
              onInput={handleInput}
              onKeyDown={handleKeyDown}
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
        <LeftSide>ahoradosul.com.br</LeftSide>
      </TextContainer>
    </Container>
  );
};

export default Lower;