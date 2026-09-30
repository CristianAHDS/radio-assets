import { FiBarChart2, FiMapPin } from 'react-icons/fi';
import {
  GlobalStyle,
  Page,
  Panel,
  Header,
  HeaderLeft,
  HeaderIcon,
  Title,
  Subtitle,
  HeaderBadge,
  List,
  Row,
  Rank,
  Info,
  Name,
  BarTrack,
  Bar,
  Pct,
  Votes,
} from './painel.styled';
import { useApuracao } from '../../../hooks/useApuracao';
import {
  totalVotos,
  percentual,
  formatNumero,
  formatPct,
  comCores,
} from '../data';

const PainelApuracao = () => {
  const apuracao = useApuracao();
  const candidatos = comCores(apuracao.candidatos);
  const secoesApuradas = apuracao.secoesApuradas;
  const secoesTotais = apuracao.secoesTotais;

  const total = totalVotos(candidatos);
  const ordenados = [...candidatos]
    .map((c) => ({ ...c, pct: percentual(c, candidatos) }))
    .sort((a, b) => b.votos - a.votos);

  return (
    <>
      <GlobalStyle />
      <Page>
        <Panel>
          <Header>
            <HeaderLeft>
              <HeaderIcon>
                <FiBarChart2 size={24} />
              </HeaderIcon>
              <div>
                <Title>Apuração de Votos</Title>
                <Subtitle>Resultado parcial da eleição</Subtitle>
              </div>
            </HeaderLeft>
            <HeaderBadge>
              <FiMapPin size={15} />
              {formatNumero(secoesApuradas)} / {formatNumero(secoesTotais)}{' '}
              seções apuradas
            </HeaderBadge>
          </Header>

          <List>
            {ordenados.map((cand, i) => (
              <Row key={cand.numero ?? cand.nome} $cor={cand.cor}>
                <Rank $cor={cand.cor}>{i + 1}º</Rank>
                <Info>
                  <Name>{cand.nome}</Name>
                  <BarTrack>
                    <Bar $cor={cand.cor} style={{ width: `${cand.pct}%` }} />
                  </BarTrack>
                </Info>
                <Pct>{formatPct(cand.pct)}%</Pct>
                <Votes>
                  {formatNumero(cand.votos)} votos
                  <div style={{ marginTop: 2 }}>
                    {formatNumero(total)} total
                  </div>
                </Votes>
              </Row>
            ))}
          </List>
        </Panel>
      </Page>
    </>
  );
};

export default PainelApuracao;
