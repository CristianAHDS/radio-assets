import { useEffect, useMemo, useState } from 'react';
import { FiBarChart2, FiMapPin } from 'react-icons/fi';
import {
  GlobalStyle,
  Page,
  Card,
  Header,
  HeaderLeft,
  HeaderIcon,
  Title,
  Subtitle,
  HeaderRight,
  HeaderBadge,
  Contador,
  Viewport,
  Slide,
  CandidatoCard,
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
  Dots,
  Dot,
  EmptyState,
} from './carrossel.styled';
import { useEleicoes } from '../../../hooks/useEleicoes';
import { CORES_CANDIDATOS, formatNumero } from '../data';

const TITULOS = {
  presidente: 'Apuração Presidencial',
  governador: 'Apuração Governo do Estado',
  senador: 'Apuração Senado',
};

const INTERVALO = 6000;

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

const CarrosselCandidatos = ({ cargo = 'presidente' }) => {
  const { candidatos, carregando, secoesApuradas } = useEleicoes(cargo);

  const lista = useMemo(
    () =>
      candidatos
        .map((cand, i) => ({
          ...cand,
          cor: CORES_CANDIDATOS[i % CORES_CANDIDATOS.length],
        }))
        .sort((a, b) => (b.pct || 0) - (a.pct || 0)),
    [candidatos],
  );

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    setIndice(0);
  }, [lista.length, cargo]);

  useEffect(() => {
    if (lista.length <= 1) return undefined;
    const interval = setInterval(() => {
      setIndice((prev) => (prev + 1) % lista.length);
    }, INTERVALO);
    return () => clearInterval(interval);
  }, [lista.length]);

  const cand = lista[indice];

  return (
    <>
      <GlobalStyle />
      <Page>
        <Card>
          <Header>
            <HeaderLeft>
              <HeaderIcon>
                <FiBarChart2 size={24} />
              </HeaderIcon>
              <div>
                <Title>{TITULOS[cargo] || 'Apuração'}</Title>
                <Subtitle>Resultado parcial por candidato</Subtitle>
              </div>
            </HeaderLeft>
            <HeaderRight>
              <HeaderBadge>
                <FiMapPin size={15} />
                {secoesApuradas != null
                  ? `${secoesApuradas.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}% apurado`
                  : 'ao vivo'}
              </HeaderBadge>
              {lista.length > 0 && (
                <Contador>
                  {indice + 1} / {lista.length}
                </Contador>
              )}
            </HeaderRight>
          </Header>

          {carregando && lista.length === 0 ? (
            <EmptyState>Carregando candidatos...</EmptyState>
          ) : lista.length === 0 ? (
            <EmptyState>Nenhum candidato encontrado</EmptyState>
          ) : (
            <>
              <Viewport>
                <Slide key={cand.nome + indice}>
                  <CandidatoCard $cor={cand.cor}>
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
                      <Percentual $cor={cand.cor}>
                        {cand.percentual || '0,00%'}
                      </Percentual>
                      <PercentLabel>dos votos válidos</PercentLabel>
                      {cand.votosNumero != null && (
                        <Votos>{formatNumero(cand.votosNumero)} votos</Votos>
                      )}
                    </PercentBox>
                  </CandidatoCard>
                </Slide>
              </Viewport>

              {lista.length > 1 && (
                <Footer>
                  <Dots>
                    {lista.map((c, i) => (
                      <Dot key={c.nome + i} $ativo={i === indice} />
                    ))}
                  </Dots>
                </Footer>
              )}
            </>
          )}
        </Card>
      </Page>
    </>
  );
};

export default CarrosselCandidatos;
