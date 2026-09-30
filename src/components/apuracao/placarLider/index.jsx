import { FiTrendingUp } from 'react-icons/fi';
import {
  GlobalStyle,
  Page,
  Card,
  Badge,
  LeaderName,
  LeaderPct,
  Diff,
} from './placarLider.styled';
import { useApuracao } from '../../../hooks/useApuracao';
import { percentual, formatPct, comCores } from '../data';

const PlacarLider = () => {
  const apuracao = useApuracao();
  const candidatos = comCores(apuracao.candidatos);

  const ordenados = [...candidatos]
    .map((c) => ({ ...c, pct: percentual(c, candidatos) }))
    .sort((a, b) => b.votos - a.votos);

  const lider = ordenados[0];
  const segundo = ordenados[1] || { nome: '-', pct: 0 };
  const diferenca = Math.max(0, lider.pct - segundo.pct);

  return (
    <>
      <GlobalStyle />
      <Page>
        <Card>
          <Badge>
            <FiTrendingUp size={14} /> 1º Líder
          </Badge>
          <LeaderName>{lider.nome}</LeaderName>
          <LeaderPct $cor={lider.cor}>{formatPct(lider.pct)}%</LeaderPct>
          <Diff>
            <strong>{formatPct(diferenca)}%</strong> de frente para{' '}
            <strong>{segundo.nome}</strong> ({formatPct(segundo.pct)}%)
          </Diff>
        </Card>
      </Page>
    </>
  );
};

export default PlacarLider;
