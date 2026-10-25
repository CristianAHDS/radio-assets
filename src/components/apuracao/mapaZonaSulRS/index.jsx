import { useMemo, useRef, useState, useEffect } from 'react';
import { FiMapPin, FiClock } from 'react-icons/fi';
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
  LiveBadge,
  LiveDot,
  Grid,
  Tile,
  TileTop,
  CidadeSigla,
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
} from './mapaZonaSulRS.styled';
import { useApuracaoCidadesRS, CIDADES_PRINCIPAIS_RS } from '../../../hooks/useApuracaoCidadesRS';
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

const MapaZonaSulRS = () => {
  const { cidades, carregando, atualizadoEm } = useApuracaoCidadesRS();
  const captureRef = useRef(null);
  const [ultimaAtualizacaoLocal, setUltimaAtualizacaoLocal] = useState(null);

  useEffect(() => {
    if (!carregando && cidades.some((c) => c.live)) {
      setUltimaAtualizacaoLocal(new Date());
    }
  }, [carregando, cidades]);

  const secoesTotais = cidades.reduce(
    (acc, cidade) => acc + (cidade.secoesTotais || 0),
    0,
  );
  const secoesApuradas = cidades.reduce(
    (acc, cidade) => acc + (cidade.secoesApuradas || 0),
    0,
  );
  const pctApuradoMedio = cidades.reduce(
    (acc, cidade) => acc + (cidade.pctApurado || 0),
    0,
  ) / (cidades.length || 1);
  const pctGeral =
    secoesTotais > 0 ? (secoesApuradas / secoesTotais) * 100 : pctApuradoMedio;

  const legenda = useMemo(() => {
    const infoPorNumero = new Map();
    const votosPorNumero = new Map();
    const cidadesPorNumero = new Map();

    cidades.forEach((cidade) => {
      cidade.candidatos.forEach((cand) => {
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

      const lider = cidade.candidatos[0];
      if (lider && cidade.totalVotos > 0) {
        cidadesPorNumero.set(
          lider.numero,
          (cidadesPorNumero.get(lider.numero) || 0) + 1,
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
          cidades: cidadesPorNumero.get(cand.numero) || 0,
          pct: total > 0 ? (votos / total) * 100 : 0,
        };
      })
      .sort((a, b) => b.votos - a.votos);
  }, [cidades]);

  const temCandidatos = cidades.some(
    (cidade) => cidade.candidatos.length > 0,
  );
  const temVotos = cidades.some((cidade) => cidade.totalVotos > 0);
  const mostrarGrid = temCandidatos && (!carregando || temVotos);

  return (
    <>
      <GlobalStyle />
      <Page>
        <Wrap ref={captureRef}>
          <Header>
            <HeaderLeft>
              <HeaderIcon>
                <FiMapPin size={28} />
              </HeaderIcon>
              <div>
                <Title>Principais Cidades · RS · 2º Turno</Title>
                <Subtitle>
                  {temVotos
                    ? 'Líder em cada cidade'
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
              {CIDADES_PRINCIPAIS_RS.map((cidadeInfo) => {
                const cidade = cidades.find((c) => c.codigo === cidadeInfo.codigo);
                const lider = cidade?.candidatos[0];
                const ativo = Boolean(lider && cidade && cidade.totalVotos > 0);
                return (
                  <Tile
                    key={cidadeInfo.codigo}
                    $cor={lider?.cor || CORES.textoSuave}
                    $ativo={ativo}
                  >
                    <TileTop>
                      <CidadeSigla $cor={ativo ? lider.cor : CORES.textoSuave}>
                        {cidadeInfo.nomeCurto}
                      </CidadeSigla>
                      <TileApurado>
                        {cidade ? formatPct(cidade.pctApurado) : '0'}%
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
                  <LegendPct>{formatPct(cand.pct)}%</LegendPct>
                  <span>· {cand.cidades} cidades</span>
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
            fileName="mapa-zona-sul-rs-2-turno.png"
          />
        </Wrap>
      </Page>
    </>
  );
};

export default MapaZonaSulRS;
export { CIDADES_PRINCIPAIS_RS };