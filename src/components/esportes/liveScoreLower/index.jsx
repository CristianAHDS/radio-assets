import { useState, useEffect, useRef } from 'react';
import {
  Container,
  TextContainer,
  LeftSide,
  TextSide,
  ScrollingWrapper,
} from './lowerEsporte.styled';

const Lower = () => {
  const [dados, setDados] = useState(null);

  const horariosPermitidos = [
    '12:00',
    '12:30',
    '12:40',
    '18:00',
    '18:10',
    '18:20',
    '18:30',
    '18:40',
    '18:50',
    '19:00',
  ];

  const fetchDados = async () => {
    try {
      const response = await fetch(
        'https://api.api-futebol.com.br/v1/campeonatos/14/rodadas/33',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer live_794f2c64379593df1ccf3bd66ab40d',
          },
        },
      );

      if (!response.ok)
        throw new Error('Erro na requisição: ' + response.status);

      const data = await response.json();
      console.log('🔄 Dados atualizados da API:', data);

      localStorage.setItem('dadosLiveScore', JSON.stringify(data));
      localStorage.setItem(
        'dadosLiveScoreUltimaAtualizacao',
        new Date().toISOString(),
      );
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const deveAtualizarAgora = () => {
    const agora = new Date();
    const horaMinuto = agora.toTimeString().slice(0, 5);
    return horariosPermitidos.includes(horaMinuto);
  };

  useEffect(() => {
    const dadosLocal = localStorage.getItem('dadosLiveScore');

    if (dadosLocal) {
      try {
        setDados(JSON.parse(dadosLocal));
        console.log('📦 Dados carregados do localStorage');
      } catch (e) {
        console.warn('⚠️ Dados corrompidos no localStorage', e);
        localStorage.removeItem('dadosLiveScore');
        fetchDados();
      }
    }

    if (!dadosLocal) {
      console.log('⚠️ Nenhum dado encontrado, buscando da API...');
      fetchDados();
    } else {
      const interval = setInterval(() => {
        if (deveAtualizarAgora()) {
          console.log('⏰ Horário permitido, atualizando dados...');
          fetchDados();
        }
      }, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const [text, setText] = useState(() => {
    return localStorage.getItem('lowerTextLiveScore');
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
      const speed = 280;
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
    if (text) {
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
    }
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
            {text} | | {text}
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
            <div
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: formatText(text) }}
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
