import {
  GlobalStyle,
  Page,
  Card,
  Badge,
  Title,
  Sub,
  MainPct,
  Track,
  Bar,
  Stats,
  Stat,
  StatValue,
  StatLabel,
  LiveDot,
  ProgressDetail,
  DetailItem,
  DetailValue,
  DetailLabel,
} from './urnasApuradas.styled';
import { useApuracao } from '../../../hooks/useApuracao';
import { formatNumero, formatPct } from '../data';

const UrnasApuradas = () => {
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
          <Badge>Urnas Apuradas</Badge>
          <Title>Progresso da Apuração</Title>
          <Sub>Seções eleitorais apuradas em tempo real</Sub>
          <MainPct>{formatPct(pctSecoes)}%</MainPct>
          <Track>
            <Bar style={{ width: `${pctSecoes}%` }} />
          </Track>
          <Stats>
            <Stat $delay={0}>
              <StatValue>
                {formatNumero(secoesApuradas)} / {formatNumero(secoesTotais)}
              </StatValue>
              <StatLabel>Seções apuradas</StatLabel>
            </Stat>
            <Stat $delay={0.1}>
              <StatValue>{formatNumero(secoesTotais - secoesApuradas)}</StatValue>
              <StatLabel>Seções restantes</StatLabel>
            </Stat>
            <Stat $delay={0.2}>
              <StatValue>{formatNumero(total)}</StatValue>
              <StatLabel>Votos válidos</StatLabel>
            </Stat>
            <Stat $delay={0.3}>
              <StatValue>{formatPct(pctSecoes)}%</StatValue>
              <StatLabel>Percentual total</StatLabel>
            </Stat>
          </Stats>
          <LiveDot>ao vivo</LiveDot>
          <ProgressDetail>
            <DetailItem>
              <DetailValue>{formatNumero(secoesApuradas)}</DetailValue>
              <DetailLabel>Seções apuradas</DetailLabel>
            </DetailItem>
            <DetailItem>
              <DetailValue>{formatNumero(secoesTotais)}</DetailValue>
              <DetailLabel>Total de seções</DetailLabel>
            </DetailItem>
            <DetailItem>
              <DetailValue>{formatNumero(secoesTotais - secoesApuradas)}</DetailValue>
              <DetailLabel>Faltam apurar</DetailLabel>
            </DetailItem>
            <DetailItem>
              <DetailValue>{formatPct(pctSecoes)}%</DetailValue>
              <DetailLabel>Concluído</DetailLabel>
            </DetailItem>
          </ProgressDetail>
        </Card>
      </Page>
    </>
  );
};

export default UrnasApuradas;