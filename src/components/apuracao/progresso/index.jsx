import {
  GlobalStyle,
  Page,
  Card,
  Title,
  Sub,
  Pct,
  Track,
  Bar,
  Stats,
  Stat,
  StatValue,
  StatLabel,
  LiveDot,
} from './progresso.styled';
import { useApuracao } from '../../../hooks/useApuracao';
import { formatNumero, formatPct } from '../data';

const ProgressoApuracao = () => {
  const apuracao = useApuracao();
  const { secoesApuradas, secoesTotais, totalVotos: total } = apuracao;
  const pctSecoes =
    apuracao.pctApurado ||
    (secoesTotais ? (secoesApuradas / secoesTotais) * 100 : 0);

  return (
    <>
      <GlobalStyle />
      <Page>
        <Card>
          <Title>Progresso da Apuração</Title>
          <Sub>Seções eleitorais apuradas em tempo real</Sub>
          <Pct>{formatPct(pctSecoes)}%</Pct>
          <Track>
            <Bar style={{ width: `${pctSecoes}%` }} />
          </Track>
          <Stats>
            <Stat>
              <StatValue>
                {formatNumero(secoesApuradas)} / {formatNumero(secoesTotais)}
              </StatValue>
              <StatLabel>Seções apuradas</StatLabel>
            </Stat>
            <Stat>
              <StatValue>{formatNumero(total)}</StatValue>
              <StatLabel>Votos válidos</StatLabel>
            </Stat>
            <Stat>
              <LiveDot>ao vivo</LiveDot>
            </Stat>
          </Stats>
        </Card>
      </Page>
    </>
  );
};

export default ProgressoApuracao;
