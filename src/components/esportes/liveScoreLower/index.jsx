import { useState, useEffect, useRef } from 'react';
import {
  Container,
  TextContainer,
  LeftSide,
  TextSide,
  ScrollingWrapper,
} from './lowerEsporte.styled';

const Lower = () => {
  const defaultText = 'Edit';
  const [text, setText] = useState(() => {
    return localStorage.getItem('lowerTextLiveScore') || defaultText;
  });

  const [animationDuration, setAnimationDuration] = useState(30);
  const measureRef = useRef(null);
  const contentRef = useRef(null);

  // 👉 Função para gerar o texto baseado nos dados do LiveScore (salvos no localStorage)
  const getLiveScoreText = () => {
    try {
      const dados = JSON.parse(localStorage.getItem('dadosLiveScore'));
      if (!dados || !dados.partidas) return '';

      // Monta uma string tipo: "Amazonas 0x0 Novorizontino • Atlético-GO 1x0 Vila Nova • ..."
      const texto = dados.partidas
        .map((jogo) => {
          const mandante = jogo.time_mandante?.nome_popular || 'Time 1';
          const visitante = jogo.time_visitante?.nome_popular || 'Time 2';
          const placarM = jogo.placar_mandante ?? '-';
          const placarV = jogo.placar_visitante ?? '-';
          return `${mandante} ${placarM}x${placarV} ${visitante}`;
        })
        .join(' • ');

      return texto;
    } catch (e) {
      console.warn('Erro ao ler dadosLiveScore do localStorage:', e);
      return '';
    }
  };

  // 🔄 Atualiza o texto com dados do localStorage (LiveScore) quando carregar
  useEffect(() => {
    const textoDosJogos = getLiveScoreText();
    if (textoDosJogos) {
      // Junta o texto manual com os jogos
      setText((prev) => `${prev} • ${textoDosJogos}`);
    }
  }, []);

  // Salva texto puro no localStorage
  useEffect(() => {
    localStorage.setItem('lowerTextLiveScore', text);
  }, [text]);

  // Recalcula largura e duração com base no texto
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
        <LeftSide>ahoradosul.com.br</LeftSide>
      </TextContainer>
    </Container>
  );
};

export default Lower;
