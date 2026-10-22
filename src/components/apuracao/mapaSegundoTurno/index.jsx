import { useMemo } from 'react';
import { FiMap, FiClock } from 'react-icons/fi';
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
  Grid,
  Tile,
  TileTop,
  UfSigla,
  TileApurado,
  TileName,
  TilePct,
  TileVazio,
  TileTrack,
  TileBar,
  Footer,
  Legend,
  LegendItem,
  LegendDot,
  LegendName,
  LegendPct,
  FooterItem,
  EmptyState,
} from './mapaSegundoTurno.styled';
import { useApuracaoEstados } from '../../../hooks/useApuracaoEstados';
import { CORES, formatPct } from '../data';

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

const MapaSegundoTurno = () => {
  const { estados, carregando, atualizadoEm } = useApuracaoEstados();

  const secoesTotais = estados.reduce(
    (acc, estado) => acc + (estado.secoesTotais || 0),
    0,
  );
  const secoesApuradas = estados.reduce(
    (acc, estado) => acc + (estado.secoesApuradas || 0),
    0,
  );
  const pctGeral =
    secoesTotais > 0 ? (secoesApuradas / secoesTotais) * 100 : 0;

  const legenda = useMemo(() => {
    const infoPorNumero = new Map();
    const votosPorNumero = new Map();
    const ufsPorNumero = new Map();

    estados.forEach((estado) => {
      estado.candidatos.forEach((cand) => {
        if (!infoPorNumero.has(cand.numero)) {
          infoPorNumero.set(cand.numero, {
            numero: cand.numero,
            nome: cand.nome,
            cor: cand.cor,
          });
        }
        votosPorNumero.set(
          cand.numero,
          (votosPorNumero.get(cand.numero) || 0) + (cand.votos || 0),
        );
      });

      const lider = estado.candidatos[0];
      if (lider && estado.totalVotos > 0) {
        ufsPorNumero.set(
          lider.numero,
          (ufsPorNumero.get(lider.numero) || 0) + 1,
        );
      }
    });

    const total = [...votosPorNumero.values()].reduce(
      (acc, votos) => acc + votos,
      0,
    );

    return [...infoPorNumero.values()]
      .map((cand) => {
        const votos = votosPorNumero.get(cand.numero) || 0;
        return {
          ...cand,
          votos,
          ufs: ufsPorNumero.get(cand.numero) || 0,
          pct: total > 0 ? (votos / total) * 100 : 0,
        };
      })
      .sort((a, b) => b.votos - a.votos);
  }, [estados]);

  const temCandidatos = estados.some(
    (estado) => estado.candidatos.length > 0,
  );
  const temVotos = estados.some((estado) => estado.totalVotos > 0);
  const mostrarGrid = temCandidatos && (!carregando || temVotos);

  return (
    <>
      <GlobalStyle />
      <Page>
        <Wrap>
          <Header>
            <HeaderLeft>
              <HeaderIcon>
                <FiMap size={26} />
              </HeaderIcon>
              <div>
                <Title>Mapa por UF · 2º Turno</Title>
                <Subtitle>
                  {temVotos
                    ? 'Líder em cada estado'
                    : 'Aguardando votos apurados'}
                </Subtitle>
              </div>
            </HeaderLeft>
            <HeaderRight>
              <HeaderBadge>
                {formatPct(pctGeral)}% apurado
              </HeaderBadge>
              <LiveBadge>
                <LiveDot $on={!carregando && temVotos} /> Tempo real
              </LiveBadge>
            </HeaderRight>
          </Header>

          {!mostrarGrid ? (
            <EmptyState>
              {carregando
                ? 'Carregando apuração...'
                : 'Aguardando apuração do 2º turno'}
            </EmptyState>
          ) : (
            <Grid>
              {estados.map((estado) => {
                const lider = estado.candidatos[0];
                const ativo = Boolean(lider && estado.totalVotos > 0);
                return (
                  <Tile
                    key={estado.uf}
                    $cor={lider?.cor || CORES.textoSuave}
                    $ativo={ativo}
                  >
                    <TileTop>
                      <UfSigla $cor={ativo ? lider.cor : CORES.textoSuave}>
                        {estado.uf.toUpperCase()}
                      </UfSigla>
                      <TileApurado>
                        {formatPct(estado.pctApurado)}%
                      </TileApurado>
                    </TileTop>

                    {ativo ? (
                      <>
                        <div>
                          <TileName>{nomeCurto(lider)}</TileName>
                          <TilePct $cor={lider.cor}>
                            {formatPct(lider.pct)}
                            <small>%</small>
                          </TilePct>
                        </div>
                        <TileTrack>
                          <TileBar
                            $cor={lider.cor}
                            $width={Math.min(100, lider.pct || 0)}
                          />
                        </TileTrack>
                      </>
                    ) : (
                      <TileVazio>—</TileVazio>
                    )}
                  </Tile>
                );
              })}
            </Grid>
          )}

          <Footer>
            <Legend>
              {legenda.map((cand) => (
                <LegendItem key={cand.numero}>
                  <LegendDot $cor={cand.cor} />
                  <LegendName>{nomeCurto(cand)}</LegendName>
                  <LegendPct>{formatPct(cand.pct)}%</LegendPct>
                  <span>· {cand.ufs} UFs</span>
                </LegendItem>
              ))}
            </Legend>
            <FooterItem>
              <FiClock size={14} />
              {horaTexto(atualizadoEm)}
            </FooterItem>
          </Footer>
        </Wrap>
      </Page>
    </>
  );
};

export default MapaSegundoTurno;
