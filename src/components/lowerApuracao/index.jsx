import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Bar,
  SideLabel,
  ScrollingSide,
  ScrollingWrapper,
  SectionGroup,
  SectionTag,
  Candidate,
  CandidatePhoto,
  CandidateAvatar,
  CandidateName,
  CandidatePct,
} from './lowerApuracao.styled';
import { useApuracaoSecoes } from '../../hooks/useApuracaoSecoes';
import { formatPct } from '../apuracao/data';
import { corPartido } from '../apuracao/partidos';

const LIMITE_POR_SECAO = {
  'deputado-federal': 12,
  'deputado-estadual': 12,
};

const iniciais = (nome) => {
  const partes = String(nome || '')
    .split(' ')
    .filter((p) => p.length > 2);
  if (partes.length === 0) return '?';
  return partes
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
};

const prepararCandidatos = (candidatos, cargo) =>
  [...candidatos]
    .map((cand) => ({
      ...cand,
      cor: corPartido(cand.partido),
    }))
    .sort((a, b) => (b.votosNumero || 0) - (a.votosNumero || 0))
    .slice(0, LIMITE_POR_SECAO[cargo] ?? candidatos.length);

const Avatar = ({ cand }) => {
  const [status, setStatus] = useState('loading');

  return (
    <CandidateAvatar $color={cand.cor}>
      {iniciais(cand.nome)}
      {cand.foto && status !== 'error' && (
        <CandidatePhoto
          $loaded={status === 'loaded'}
          src={cand.foto}
          alt={cand.nome}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
    </CandidateAvatar>
  );
};

const Secoes = ({ secoes, ...props }) => (
  <>
    {secoes.map((secao) => (
      <SectionGroup key={secao.cargo} {...props}>
        <SectionTag>{secao.label}</SectionTag>
        {secao.candidatos.map((cand, i) => (
          <Candidate key={`${secao.cargo}-${cand.nome}-${i}`}>
            <Avatar cand={cand} />
            <CandidateName>{cand.nome}</CandidateName>
            <CandidatePct>
              {cand.percentual || `${formatPct(cand.pct)}%`}
            </CandidatePct>
          </Candidate>
        ))}
      </SectionGroup>
    ))}
  </>
);

const LowerApuracao = () => {
  const { secoes: secoesBrutas } = useApuracaoSecoes();

  const secoes = useMemo(
    () =>
      secoesBrutas
        .map((secao) => ({
          ...secao,
          candidatos: prepararCandidatos(secao.candidatos, secao.cargo),
        }))
        .filter((secao) => secao.candidatos.length > 0),
    [secoesBrutas],
  );

  const [animationDuration, setAnimationDuration] = useState(30);
  const measureRef = useRef(null);

  useEffect(() => {
    if (measureRef.current) {
      const measuredWidth = measureRef.current.offsetWidth;
      const speed = 100;
      setAnimationDuration(Math.max(15, measuredWidth / speed));
    }
  }, [secoes]);

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
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <Secoes secoes={secoes} />
          </span>

          <ScrollingWrapper $duration={animationDuration}>
            <Secoes secoes={secoes} />
            <Secoes secoes={secoes} aria-hidden="true" />
          </ScrollingWrapper>
        </ScrollingSide>
        <SideLabel>ahoradosul.com.br</SideLabel>
      </Bar>
    </Container>
  );
};

export default LowerApuracao;
