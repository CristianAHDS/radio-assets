import { useMemo } from 'react';
import { FiTrendingUp, FiClock, FiInfo } from 'react-icons/fi';
import {
  GlobalStyle,
  Page,
  Wrap,
  Header,
  HeaderLeft,
  HeaderIcon,
  Title,
  Subtitle,
  HeaderRight,
  HeaderBadge,
  LiveBadge,
  LiveDot,
  List,
  Row,
  Rank,
  Uf,
  Info,
  Lider,
  Adversario,
  MargemTrack,
  MargemFill,
  Marks,
  Pct,
  Delta,
  Footer,
  FooterItem,
  EmptyState,
} from './rankingUfsSegundoTurno.styled';
import { useApuracaoEstados } from '../../../hooks/useApuracaoEstados';
import { formatPct } from '../data';

const nomeCurto = (cand) => {
  if (!cand) return '';
  const nome = (cand.nomeUrna || cand.nome || '').trim();
  const partes = nome.split(/\s+/);
  return partes.length > 2
    ? `${partes[0]} ${partes[partes.length - 1]}`
    : nome;
};

const horaTexto = (data) => {
  if (!data) return 'atualização a cada 60s';
  const hora = new Date(data).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `atualizado ${hora}`;
};

const RankingUfsSegundoTurno = () => {
  const { estados, carregando, atualizadoEm } = useApuracaoEstados();

  const temVotos = estados.some((estado) => estado.totalVotos > 0);

  const ranking = useMemo(
    () =>
      estados
        .filter((estado) => estado.candidatos.length >= 2)
        .map((estado) => {
          const [primeiro, segundo] = estado.candidatos;
          return {
            uf: estado.uf,
            primeiro,
            segundo,
            margem: Math.max(0, (primeiro.pct || 0) - (segundo.pct || 0)),
          };
        })
        .sort(
          (a, b) =>
            b.margem - a.margem || a.uf.localeCompare(b.uf),
        )
        .slice(0, 10),
    [estados],
  );

  const maiorMargem = ranking[0]?.margem || 0;

  return (
    <>
      <GlobalStyle />
      <Page>
        <Wrap>
          <Header>
            <HeaderLeft>
              <HeaderIcon>
                <FiTrendingUp size={26} />
              </HeaderIcon>
              <div>
                <Title>Ranking de UFs</Title>
                <Subtitle>
                  {temVotos
                    ? 'Maior vantagem do líder · 2º turno'
                    : 'Aguardando votos apurados · 2º turno'}
                </Subtitle>
              </div>
            </HeaderLeft>
            <HeaderRight>
              <HeaderBadge>Top {ranking.length || 10}</HeaderBadge>
              <LiveBadge>
                <LiveDot $on={!carregando && temVotos} /> Tempo real
              </LiveBadge>
            </HeaderRight>
          </Header>

          {ranking.length === 0 || (carregando && !temVotos) ? (
            <EmptyState>
              {carregando
                ? 'Carregando apuração...'
                : 'Aguardando apuração do 2º turno'}
            </EmptyState>
          ) : (
            <List>
              {ranking.map((item, index) => (
                <Row
                  key={item.uf}
                  $cor={item.primeiro.cor}
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <Rank $destaque={index === 0}>{index + 1}º</Rank>
                  <Uf $cor={item.primeiro.cor}>
                    {item.uf.toUpperCase()}
                  </Uf>
                  <Info>
                    <Lider>{nomeCurto(item.primeiro)}</Lider>
                    <Adversario>
                      vs {nomeCurto(item.segundo)} ·{' '}
                      {formatPct(item.segundo.pct)}%
                    </Adversario>
                  </Info>
                  <MargemTrack>
                    <MargemFill
                      $cor={item.primeiro.cor}
                      $width={
                        maiorMargem > 0
                          ? (item.margem / maiorMargem) * 100
                          : 0
                      }
                    />
                  </MargemTrack>
                  <Marks>
                    <Pct $cor={item.primeiro.cor}>
                      {formatPct(item.primeiro.pct)}%
                    </Pct>
                    <Delta>+{formatPct(item.margem)} pts</Delta>
                  </Marks>
                </Row>
              ))}
            </List>
          )}

          <Footer>
            <FooterItem>
              <FiInfo size={13} /> Vantagem em pontos entre os dois mais
              votados
            </FooterItem>
            <FooterItem>
              <FiClock size={13} /> {horaTexto(atualizadoEm)}
            </FooterItem>
          </Footer>
        </Wrap>
      </Page>
    </>
  );
};

export default RankingUfsSegundoTurno;
