import { useMemo } from 'react';
import { FiBarChart2, FiMapPin, FiClock, FiAward } from 'react-icons/fi';
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
  CandidateCard,
  LeaderTag,
  Rank,
  FotoWrap,
  FotoFallback,
  Info,
  Numero,
  Nome,
  Partido,
  BarTrack,
  Bar,
  PercentBox,
  Percentual,
  PercentLabel,
  Votos,
  Footer,
  FooterItem,
  Diferenca,
  EmptyState,
} from './segundoTurno.styled';
import { useEleicoes } from '../../../hooks/useEleicoes';
import { formatNumero, formatPct } from '../data';
import { corPartido } from '../partidos';

const abreviarPartido = (partido) => {
  if (!partido) return '';
  return partido.replace(/\s*-\s*(\d+)\s*$/, '').trim();
};

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

const formatPctCandidato = (cand) => {
  if (cand.percentual) return cand.percentual;
  if (cand.pct != null) return `${formatPct(cand.pct)}%`;
  return '0,00%';
};

const SegundoTurno = ({ cargo = 'presidente' }) => {
  const { candidatos, carregando, secoesApuradas, atualizadoEm, erro } =
    useEleicoes(cargo);

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

  const lider = lista[0];
  const segundo = lista[1];
  const diferenca =
    lider && segundo ? Math.max(0, (lider.pct || 0) - (segundo.pct || 0)) : 0;

  return (
    <>
      <GlobalStyle />
      <Page>
        <Wrap>
          <Header>
            <HeaderLeft>
              <HeaderIcon>
                <FiBarChart2 size={26} />
              </HeaderIcon>
              <div>
                <Title>2º Turno · Presidência</Title>
                <Subtitle>Apuração em tempo real</Subtitle>
              </div>
            </HeaderLeft>
            <HeaderRight>
              <HeaderBadge>
                <FiMapPin size={15} />
                {secoesApuradas != null
                  ? `${Number(secoesApuradas).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}% apurado`
                  : 'ao vivo'}
              </HeaderBadge>
              <LiveBadge>
                <LiveDot $on={!carregando && !erro} /> Tempo real
              </LiveBadge>
            </HeaderRight>
          </Header>

          {lista.length === 0 ? (
            <EmptyState>
              {carregando
                ? 'Carregando apuração...'
                : 'Aguardando apuração do 2º turno'}
            </EmptyState>
          ) : (
            <List>
              {lista.map((cand, i) => (
                <CandidateCard
                  key={cand.nome || i}
                  $cor={cand.cor}
                  $leader={i === 0}
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <Rank $cor={cand.cor}>{i + 1}º</Rank>
                  <FotoWrap $cor={cand.cor}>
                    {cand.foto ? (
                      <img
                        src={cand.foto}
                        alt={cand.nome}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <FotoFallback $cor={cand.cor}>
                        {fallbackIniciais(cand.nome)}
                      </FotoFallback>
                    )}
                  </FotoWrap>

                  <Info>
                    {cand.numeroPartido != null && (
                      <Numero $cor={cand.cor}>
                        {String(cand.numeroPartido).padStart(2, '0')}
                      </Numero>
                    )}
                    <Nome>{cand.nome}</Nome>
                    <Partido>{abreviarPartido(cand.partido)}</Partido>
                    <BarTrack>
                      <Bar
                        $cor={cand.cor}
                        $width={Math.min(100, cand.pct || cand.barra || 0)}
                      />
                    </BarTrack>
                  </Info>

                  <PercentBox>
                    <LeaderTag
                      aria-hidden={i !== 0}
                      style={{ visibility: i === 0 ? 'visible' : 'hidden' }}
                    >
                      <FiAward size={13} /> Líder
                    </LeaderTag>
                    <Percentual $cor={cand.cor}>
                      {formatPctCandidato(cand)}
                    </Percentual>
                    <PercentLabel>dos votos válidos</PercentLabel>
                    {(cand.votos || cand.votosNumero != null) && (
                      <Votos>
                        {cand.votos || formatNumero(cand.votosNumero)} votos
                      </Votos>
                    )}
                  </PercentBox>
                </CandidateCard>
              ))}
            </List>
          )}

          <Footer>
            <FooterItem>
              <FiClock size={15} />
              {atualizadoEm
                ? `Atualizado ${atualizadoEm}`
                : 'Atualização automática a cada 60s'}
            </FooterItem>
            {lider && segundo && (
              <Diferenca>
                <strong>{formatPct(diferenca)}%</strong> de diferença entre{' '}
                {lider.nome} e {segundo.nome}
              </Diferenca>
            )}
          </Footer>
        </Wrap>
      </Page>
    </>
  );
};

export default SegundoTurno;
