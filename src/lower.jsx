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
  const textLower =
    'DESPEDIDA | BRASIL ENCERRA SÉRIE D COM VITÓRIA POR 1 A 0 SOBRE O LÍDER BARRA - JOÃO LIBÂNIA MARCA O ÚNICO GOL DO JOGO EM BALNEÁRIO CAMBORIÚ E XAVANTE TERMINA EM SEXTO LUGAR DO GRUPO A8. TRADICIONALISMO | RODEIO ARTÍSTICO TRADICIONALISTA É ATRAÇÃO NA FENADOCE - EVENTO PROMOVIDO PELA 26ª REGIÃO TRADICIONALISTA REÚNE ATÉ ESTE DOMINGO (27) CERCA DE 600 COMPETIDORES. SAÚDE | MÉDICOS NÃO ACEITAM PROPOSTA E VÃO RESTRINGIR ATENDIMENTOS NO HOSPITAL DE MORRO REDONDO - APÓS REPORTAGEM DE A HORA DO SUL, O SIMERS REALIZOU UMA AÇÃO NA UNIDADE, QUE ESTÁ COM TRÊS MESES DE SALÁRIOS ATRASADOS. EDUCAME | CEEE EQUATORIAL CELEBRA TRÊS ANOS DO PROJETO E+ COMUNIDADE COM 46 MIL FAMÍLIAS BENEFICIADAS - COM R$ 37 MILHÕES INVESTIDOS, INICIATIVA REFORÇA PRESENÇA SOCIAL DA DISTRIBUIDORA NO RIO GRANDE DO SUL. FUTSAL | EM TARDE DE HOMENAGEM, MALGI PERDE PARA O SÃO JOSÉ - EQUIPE PELOTENSE SOFRE 7 A 1 NO GINÁSIO DO SESI. APÓS 30 ANOS | ALUNOS E PROFESSORES DO IFSUL UNEM-SE POR REVITALIZAÇÃO DO ANTIGO RELÓGIO - PROJETO ENVOLVE OS CURSOS DE ELETRÔNICA E ELETROMECÂNICA DA INSTITUIÇÃO. ENSINO E ASSISTÊNCIA | CAMPUS FRANKLIN OLIVÉ LEITE REALIZA MAIS DE 3,5 MIL ATENDIMENTOS POR MÊS - ASSISTÊNCIA AMBULATORIAL DE MÉDIA COMPLEXIDADE ABRANGE 21 MUNICÍPIOS DA REGIÃO SUL; ACOLHIMENTO TAMBÉM SERVE COMO CAMPO DE APRENDIZADO PRÁTICO PARA OS ALUNOS. SAÚDE | SINAIS QUE PODEM EVITAR O CÂNCER DE INTESTINO - MORTE DE PRETA GIL POR CÂNCER DE INTESTINO ACENDE O ALERTA PARA A PREVENÇÃO, COM ATENÇÃO PARA HÁBITOS E SINTOMAS. EDUCAME | TRILHAS TURÍSTICO-PEDAGÓGICAS INSTIGAM APRENDIZADO SOBRE RIQUEZAS NATURAIS - PROJETO DE EXTENSÃO DA UNIPAMPA É DIRECIONADO PARA TODAS AS FAIXAS ETÁRIAS.';

  const [text, setText] = useState(textLower);
  const [secondText, setSecondText] = useState('');
  const [textWidth, setTextWidth] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(30);

  const measureRef = useRef(null);

  useEffect(() => {
    setSecondText(text);
  }, [text]);

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
          {/* Invisível para medir largura */}
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
              width={textWidth}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <ScrollingText width={textWidth} value={secondText} readOnly />
          </ScrollingWrapper>
        </TextSide>
      </TextContainer>
    </Container>
  );
};

export default Lower;
