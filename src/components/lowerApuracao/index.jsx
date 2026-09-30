import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Bar,
  SideLabel,
  ScrollingSide,
  ScrollingWrapper,
  CandidateSet,
  Candidate,
  CandidateDot,
  CandidateName,
  CandidatePct,
} from './lowerApuracao.styled';
import { useApuracao } from '../../hooks/useApuracao';
import { comCores, formatPct, percentual } from '../apuracao/data';

const CandidateList = ({ candidatos, ...props }) => (
  <CandidateSet {...props}>
    {candidatos.map((cand) => (
      <Candidate key={cand.numero ?? cand.nome}>
        <CandidateDot $color={cand.cor} />
        <CandidateName>{cand.nome}</CandidateName>
        <CandidatePct>{formatPct(cand.pct)}%</CandidatePct>
      </Candidate>
    ))}
  </CandidateSet>
);

const LowerApuracao = () => {
  const apuracao = useApuracao();
  const candidatos = useMemo(
    () =>
      [...comCores(apuracao.candidatos)]
        .map((c) => ({ ...c, pct: percentual(c, apuracao.candidatos) }))
        .sort((a, b) => b.votos - a.votos),
    [apuracao.candidatos],
  );

  const [animationDuration, setAnimationDuration] = useState(30);
  const measureRef = useRef(null);

  useEffect(() => {
    if (measureRef.current) {
      const measuredWidth = measureRef.current.offsetWidth;
      const speed = 100;
      setAnimationDuration(Math.max(15, measuredWidth / speed));
    }
  }, [candidatos]);

  return (
    <Container>
      <Bar>
        <ScrollingSide>
          <span
            ref={measureRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              visibility: 'hidden',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            <CandidateList candidatos={candidatos} />
          </span>

          <ScrollingWrapper $duration={animationDuration}>
            <CandidateList candidatos={candidatos} />
            <CandidateList candidatos={candidatos} aria-hidden="true" />
          </ScrollingWrapper>
        </ScrollingSide>
        <SideLabel>ahoradosul.com.br</SideLabel>
      </Bar>
    </Container>
  );
};

export default LowerApuracao;
