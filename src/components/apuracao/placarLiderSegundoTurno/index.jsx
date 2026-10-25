import { useMemo, useRef } from 'react';
import { FiAward, FiFlag, FiUsers, FiMapPin, FiClock } from 'react-icons/fi';
import {
  GlobalStyle,
  Page,
  Card,
  Top,
  Badge,
  LiveBadge,
  LiveDot,
  LeaderName,
  LeaderPct,
  MetaRow,
  Meta,
  Split,
  SplitFill,
  LegendRow,
  LegendItem,
  LegendDot,
  Diff,
  Footer,
  FooterItem,
  EmptyState,
} from './placarLiderSegundoTurno.styled';
import { useApuracaoEstados } from '../../../hooks/useApuracaoEstados';
import { formatNumero, formatPct, nomeCandidato } from '../data';
import ExportImageButton from '../exportImageButton';

const horaTexto = (data) => {
  if (!data) return 'atualização a cada 30s';
  const hora = new Date(data).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `atualizado ${hora}`;
};

const PlacarLiderSegundoTurno = () => {
  const { estados, carregando, atualizadoEm } = useApuracaoEstados();
  const captureRef = useRef(null);

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

  const ranking = useMemo(() => {
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

  const lider = ranking[0];
  const segundo = ranking[1];
  const diferenca =
    lider && segundo ? Math.max(0, lider.pct - segundo.pct) : 0;
  const somaPct = (lider?.pct || 0) + (segundo?.pct || 0);
  const shareLider = lider && somaPct > 0 ? (lider.pct / somaPct) * 100 : 0;
  const shareSegundo =
    segundo && somaPct > 0 ? (segundo.pct / somaPct) * 100 : 0;
  const temVotos = ranking.some((cand) => (cand.votos || 0) > 0);

  return (
    <>
      <GlobalStyle />
      <Page>
        <Card ref={captureRef}>
          <Top>
            <Badge>
              <FiAward size={15} />{' '}
              {temVotos
                ? '1º lugar · 2º turno'
                : 'Aguardando votos · 2º turno'}
            </Badge>
            <LiveBadge>
              <LiveDot $on={!carregando && Boolean(lider) && temVotos} />{' '}
              Tempo real
            </LiveBadge>
          </Top>

          {!lider ? (
            <EmptyState>
              {carregando
                ? 'Carregando apuração...'
                : 'Aguardando apuração do 2º turno'}
            </EmptyState>
          ) : (
            <>
              <LeaderName>{lider.nome}</LeaderName>
              <LeaderPct $cor={lider.cor}>
                {formatPct(lider.pct)}
                <small>%</small>
              </LeaderPct>

              <MetaRow>
                <Meta>
                  <FiFlag size={15} />
                  <strong>{lider.ufs}</strong> UFs lideradas
                </Meta>
                <Meta>
                  <FiUsers size={15} />
                  <strong>{formatNumero(lider.votos)}</strong> votos
                </Meta>
                <Meta>
                  <FiMapPin size={15} />
                  <strong>{formatPct(pctGeral)}%</strong> apurado
                </Meta>
              </MetaRow>

              <Split>
                <SplitFill $cor={lider.cor} $width={shareLider} />
                {segundo && (
                  <SplitFill $cor={segundo.cor} $width={shareSegundo} />
                )}
              </Split>

              <LegendRow>
                <LegendItem>
                  <LegendDot $cor={lider.cor} />
                  <span>{nomeCandidato(lider)}</span>
                  <strong>{formatPct(lider.pct)}%</strong>
                </LegendItem>
                {segundo && (
                  <LegendItem>
                    <LegendDot $cor={segundo.cor} />
                    <span>{nomeCandidato(segundo)}</span>
                    <strong>{formatPct(segundo.pct)}%</strong>
                  </LegendItem>
                )}
              </LegendRow>

              {segundo && temVotos && (
                <Diff>
                  <strong>+{formatPct(diferenca)} pts</strong> de vantagem
                  sobre <strong>{nomeCandidato(segundo)}</strong> (
                  {formatPct(segundo.pct)}%)
                </Diff>
              )}
            </>
          )}

          <Footer>
            <FooterItem>
              <FiMapPin size={13} /> {secoesApuradas} de {secoesTotais} seções
            </FooterItem>
            <FooterItem>
              <FiClock size={13} /> {horaTexto(atualizadoEm)}
            </FooterItem>
          </Footer>

          <ExportImageButton
            targetRef={captureRef}
            fileName="placar-lider-2-turno.png"
          />
        </Card>
      </Page>
    </>
  );
};

export default PlacarLiderSegundoTurno;
