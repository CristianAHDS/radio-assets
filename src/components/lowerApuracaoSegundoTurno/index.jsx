import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Bar,
  SideLabel,
  SideDot,
  ScrollingSide,
  ScrollingWrapper,
  UfGroup,
  UfTag,
  Candidato,
  Cor,
  Nome,
  Pct,
  Measure,
} from './lowerApuracaoSegundoTurno.styled';
import { useApuracaoEstados } from '../../hooks/useApuracaoEstados';
import { formatPct } from '../apuracao/data';

const nomeCurto = (cand) => {
  if (!cand) return '';
  const nome = (cand.nomeUrna || cand.nome || '').trim();
  const partes = nome.split(/\s+/);
  return partes.length > 2 ? `${partes[0]} ${partes[partes.length - 1]}` : nome;
};

const pctLabel = (cand, total) =>
  total > 0 && cand && cand.pct > 0 ? `${formatPct(cand.pct)}%` : '—';

const CORES_OVERRIDE = {
  13: '#e30613',
};

const corCandidato = (cand) =>
  CORES_OVERRIDE[cand?.numero] || cand?.cor || '#94a3b8';

const Estados = ({ estados, ...props }) => (
  <>
    {estados.map((estado) => (
      <UfGroup key={estado.uf} {...props}>
        <UfTag>{estado.uf.toUpperCase()}</UfTag>
        {estado.candidatos.map((cand) => (
          <Candidato key={`${estado.uf}-${cand.numero || cand.nome}`}>
            <Cor $color={corCandidato(cand)} />
            <Nome>{nomeCurto(cand)}</Nome>
            <Pct>{pctLabel(cand, estado.totalVotos)}</Pct>
          </Candidato>
        ))}
      </UfGroup>
    ))}
  </>
);

const LowerApuracaoSegundoTurno = () => {
  const { estados } = useApuracaoEstados();

  const grupos = useMemo(
    () =>
      estados
        .map((estado) => ({
          ...estado,
          candidatos: [...estado.candidatos]
            .sort((a, b) => (b.pct || 0) - (a.pct || 0))
            .slice(0, 2),
        }))
        .filter((estado) => estado.candidatos.length > 0),
    [estados],
  );

  const [animationDuration, setAnimationDuration] = useState(60);
  const measureRef = useRef(null);

  useEffect(() => {
    if (measureRef.current) {
      const speed = 160;
      setAnimationDuration(
        Math.max(20, measureRef.current.offsetWidth / speed),
      );
    }
  }, [grupos]);

  return (
    <Container>
      <Bar>
        <ScrollingSide>
          <Measure ref={measureRef} aria-hidden="true">
            <Estados estados={grupos} />
          </Measure>

          <ScrollingWrapper $duration={animationDuration}>
            <Estados estados={grupos} />
            <Estados estados={grupos} aria-hidden="true" />
          </ScrollingWrapper>
        </ScrollingSide>
        <SideLabel>AHORADOSUL.COM.BR</SideLabel>
      </Bar>
    </Container>
  );
};

export default LowerApuracaoSegundoTurno;
