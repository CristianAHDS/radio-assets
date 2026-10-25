import { useMemo, useRef, useState, useEffect } from 'react';
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
import { CORES, formatPct, nomeCandidato } from '../data';
import ExportImageButton from '../exportImageButton';

const horaTexto = (data) => {
  if (!data) return 'atualização a cada 30s';
  const hora = new Date(data).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `atualizado ${hora}`;
};

const MapaSegundoTurno = () => {
  const { estados, carregando, atualizadoEm } = useApuracaoEstados();
  const captureRef = useRef(null);
  const [ultimaAtualizacaoLocal, setUltimaAtualizacaoLocal] = useState(null);

  useEffect(() => {
    if (!carregando && estados.some((e) => e.live)) {
      setUltimaAtualizacaoLocal(new Date());
    }
  }, [carregando, estados]);

  const legenda = useMemo(() => {
    const infoPorNumero = new Map();
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
      });

      const lider = estado.candidatos[0];
      if (lider && estado.totalVotos > 0) {
        ufsPorNumero.set(
          lider.numero,
          (ufsPorNumero.get(lider.numero) || 0) + 1,
        );
      }
    });

    return [...infoPorNumero.values()]
      .map((cand) => ({
        ...cand,
        ufs: ufsPorNumero.get(cand.numero) || 0,
      }))
      .sort((a, b) => (ufsPorNumero.get(b.numero) || 0) - (ufsPorNumero.get(a.numero) || 0));
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
        <Wrap ref={captureRef}>
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
                          <TileName>{nomeCandidato(lider)}</TileName>
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
                  <LegendName>{nomeCandidato(cand)}</LegendName>
                  <span>{cand.ufs} UFs</span>
                </LegendItem>
              ))}
            </Legend>
            <FooterItem>
              <FiClock size={14} />
              {ultimaAtualizacaoLocal
                ? `Atualizado ${ultimaAtualizacaoLocal.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`
                : horaTexto(atualizadoEm)}
            </FooterItem>
          </Footer>

          <ExportImageButton
            targetRef={captureRef}
            fileName="mapa-2-turno.png"
          />
        </Wrap>
      </Page>
    </>
  );
};

export default MapaSegundoTurno;
