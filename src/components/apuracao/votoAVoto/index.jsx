import { useEffect, useMemo, useRef, useState } from 'react';
import { FiRadio } from 'react-icons/fi';
import {
  GlobalStyle,
  Page,
  Card,
  CardHeader,
  Title,
  Counter,
  Track,
  Marquee,
  Item,
  ItemDot,
} from './votoAVoto.styled';
import { useApuracao } from '../../../hooks/useApuracao';
import { comCores, formatNumero, formatPct, percentual } from '../data';

const VotoAVoto = () => {
  const apuracao = useApuracao();
  const candidatos = comCores(apuracao.candidatos);

  const itens = useMemo(
    () =>
      [...candidatos]
        .map((c) => ({ ...c, pct: percentual(c, candidatos) }))
        .sort((a, b) => b.votos - a.votos)
        .map((c) => ({
          key: c.numero ?? c.nome,
          cor: c.cor,
          texto: `${c.nome} — ${formatPct(c.pct)}% (${formatNumero(c.votos)} votos)`,
        })),
    [candidatos],
  );

  const [duration, setDuration] = useState(25);
  const measureRef = useRef(null);

  useEffect(() => {
    if (measureRef.current) {
      const width = measureRef.current.offsetWidth;
      setDuration(Math.max(15, width / 100));
    }
  }, [itens]);

  const Items = () => (
    <>
      {itens.map((item) => (
        <Item key={item.key}>
          <ItemDot $color={item.cor} />
          {item.texto}
        </Item>
      ))}
    </>
  );

  return (
    <>
      <GlobalStyle />
      <Page>
        <Card>
          <CardHeader>
            <Title>
              <FiRadio size={18} /> Voto a voto
            </Title>
            <Counter>
              <strong>{formatNumero(apuracao.secoesApuradas)}</strong> de{' '}
              {formatNumero(apuracao.secoesTotais)} seções apuradas
            </Counter>
          </CardHeader>
          <Track>
            <span
              ref={measureRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                visibility: 'hidden',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              <Items />
            </span>
            <Marquee $duration={duration}>
              <Items />
              <div aria-hidden="true">
                <Items />
              </div>
            </Marquee>
          </Track>
        </Card>
      </Page>
    </>
  );
};

export default VotoAVoto;
