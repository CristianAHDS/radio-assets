import { useEffect, useMemo, useRef, useState } from 'react';
import { FiClock, FiMapPin } from 'react-icons/fi';
import {
  GlobalStyle,
  Page,
  Card,
  Top,
  Tag,
  Diff,
  MetaRow,
  MetaItem,
  LiveDot,
  Duel,
  Side,
  Avatar,
  AvatarFallback,
  Name,
  Party,
  Pct,
  Versus,
  Bar,
  BarFill,
  Ticker,
  Marquee,
  TickerItem,
  TickerDot,
  EmptyState,
} from './votoAVotoSegundoTurnoVertical.styled';
import { useEleicoes } from '../../../hooks/useEleicoes';
import { useApuracaoEstados } from '../../../hooks/useApuracaoEstados';
import { CORES, formatNumero, formatPct } from '../data';
import { corPartido, siglaPartido } from '../partidos';

const fallbackIniciais = (nome) => {
  if (!nome) return '?';
  const partes = nome.split(' ').filter((p) => p.length > 2);
  if (partes.length === 0) return nome.slice(0, 2).toUpperCase();
  return partes
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
};

const pctTexto = (cand) => {
  if (cand.percentual) return cand.percentual.replace(/\s*%$/, '');
  if (cand.pct != null) return formatPct(cand.pct);
  return '0,0';
};

const votosTexto = (cand) => {
  if (cand.votos) return cand.votos;
  if (cand.votosNumero != null) return formatNumero(cand.votosNumero);
  return '—';
};

const nomeCurto = (cand) => {
  if (!cand) return '';
  const nome = (cand.nomeUrna || cand.nome || '').trim();
  const partes = nome.split(/\s+/);
  return partes.length > 2
    ? `${partes[0]} ${partes[partes.length - 1]}`
    : nome;
};

const pctEstado = (cand) =>
  cand && cand.pct > 0 ? `${formatPct(cand.pct)}%` : '—';

const Cargo = ({ cargo }) => {
  if (cargo === 'presidente') return 'Presidência';
  if (!cargo) return '2º turno';
  return cargo.replace(/-/g, ' ');
};

const VotoAVotoSegundoTurnoVertical = ({ cargo = 'presidente' }) => {
  const { candidatos, carregando, secoesApuradas, atualizadoEm } =
    useEleicoes(cargo);
  const { estados } = useApuracaoEstados();

  const lista = useMemo(
    () =>
      candidatos
        .map((cand) => ({ ...cand, cor: corPartido(cand.partido) }))
        .sort(
          (a, b) =>
            (b.votosNumero || 0) - (a.votosNumero || 0) ||
            (b.pct || 0) - (a.pct || 0),
        )
        .slice(0, 2),
    [candidatos],
  );

  const [lider, segundo] = lista;
  const soma = (lider?.pct || 0) + (segundo?.pct || 0);
  const shareLider = soma > 0 ? ((lider.pct || 0) / soma) * 100 : 100;
  const shareSegundo = 100 - shareLider;
  const diferenca =
    lider && segundo ? Math.max(0, (lider.pct || 0) - (segundo.pct || 0)) : 0;

  const itensTotais = useMemo(
    () =>
      lista.map((cand) => ({
        key: cand.numeroPartido ?? cand.nome,
        cor: cand.cor,
        texto: `${siglaPartido(cand.partido)} ${cand.nome} · ${pctTexto(
          cand,
        )}% · ${votosTexto(cand)} votos`,
      })),
    [lista],
  );

  const itensEstados = useMemo(
    () =>
      estados
        .filter(
          (estado) => estado.totalVotos > 0 && estado.candidatos.length > 0,
        )
        .map((estado) => {
          const [primeiro, segundoCand] = estado.candidatos;
          const liderEstado = [...estado.candidatos].sort(
            (a, b) => (b.pct || 0) - (a.pct || 0),
          )[0];

          return {
            key: estado.uf,
            cor: liderEstado?.cor || CORES.ouro,
            texto: `${estado.uf.toUpperCase()} · ${nomeCurto(
              primeiro,
            )} ${pctEstado(primeiro)} · ${nomeCurto(
              segundoCand,
            )} ${pctEstado(segundoCand)}`,
          };
        }),
    [estados],
  );

  const itens = useMemo(
    () => [...itensTotais, ...itensEstados],
    [itensEstados, itensTotais],
  );

  const [duration, setDuration] = useState(16);
  const measureRef = useRef(null);

  useEffect(() => {
    if (measureRef.current) {
      setDuration(Math.max(14, measureRef.current.offsetWidth / 110));
    }
  }, [itens]);

  const renderItens = () => (
    <>
      {itens.map((item) => (
        <TickerItem key={item.key}>
          <TickerDot $color={item.cor} />
          {item.texto}
        </TickerItem>
      ))}
    </>
  );

  return (
    <>
      <GlobalStyle />
      <Page>
        <Card>
          <Top>
            <Tag>
              <LiveDot $on={!carregando && lista.length > 0} /> 2º turno ·{' '}
              <Cargo cargo={cargo} />
            </Tag>
            {lider && segundo && (
              <Diff>
                <strong>{formatPct(diferenca)} pts</strong> de vantagem
              </Diff>
            )}
          </Top>

          <MetaRow>
            <MetaItem>
              <FiMapPin size={11} />
              {secoesApuradas != null
                ? `${Number(secoesApuradas).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}% apurado`
                : 'ao vivo'}
            </MetaItem>
            <MetaItem>
              <FiClock size={11} />
              {atualizadoEm ? `atualizado ${atualizadoEm}` : '60s'}
            </MetaItem>
          </MetaRow>

          {lista.length === 0 ? (
            <EmptyState>
              {carregando
                ? 'Carregando apuração...'
                : 'Aguardando apuração do 2º turno'}
            </EmptyState>
          ) : (
            <>
              <Duel>
                <Side>
                  <Avatar $cor={lider.cor}>
                    {lider.foto ? (
                      <img src={lider.foto} alt={lider.nome} loading="lazy" />
                    ) : (
                      <AvatarFallback $cor={lider.cor}>
                        {fallbackIniciais(lider.nome)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Name>{lider.nome}</Name>
                  <Party>
                    {siglaPartido(lider.partido)} · {votosTexto(lider)} votos
                  </Party>
                  <Pct $cor={lider.cor}>
                    {pctTexto(lider)}
                    <small>%</small>
                  </Pct>
                </Side>

                <Bar>
                  <BarFill $cor={lider.cor} $width={shareLider} />
                </Bar>

                {segundo && <Versus>VS</Versus>}

                {segundo && (
                  <Side>
                    <Avatar $cor={segundo.cor}>
                      {segundo.foto ? (
                        <img
                          src={segundo.foto}
                          alt={segundo.nome}
                          loading="lazy"
                        />
                      ) : (
                        <AvatarFallback $cor={segundo.cor}>
                          {fallbackIniciais(segundo.nome)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Name>{segundo.nome}</Name>
                    <Party>
                      {siglaPartido(segundo.partido)} · {votosTexto(segundo)}{' '}
                      votos
                    </Party>
                    <Pct $cor={segundo.cor}>
                      {pctTexto(segundo)}
                      <small>%</small>
                    </Pct>
                  </Side>
                )}

                {segundo && (
                  <Bar>
                    <BarFill $cor={segundo.cor} $width={shareSegundo} />
                  </Bar>
                )}
              </Duel>

              <Ticker>
                <span
                  ref={measureRef}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    visibility: 'hidden',
                    display: 'inline-flex',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {renderItens()}
                </span>
                <Marquee $duration={duration}>
                  {renderItens()}
                  <div aria-hidden="true" style={{ display: 'flex' }}>
                    {renderItens()}
                  </div>
                </Marquee>
              </Ticker>
            </>
          )}
        </Card>
      </Page>
    </>
  );
};

export default VotoAVotoSegundoTurnoVertical;
