import {
  GlobalStyle,
  Page,
  Card,
  Badge,
  Grid,
  Item,
  ItemHeader,
  ItemDot,
  ItemLabel,
  ItemName,
  ItemPct,
  ItemVotos,
  Legend,
  LegendItem,
  LegendDot,
} from './comparacaoCompleta.styled';
import { useApuracao } from '../../../hooks/useApuracao';
import { comCores, formatNumero, formatPct, percentual, totalVotos, CORES_ESPECIAIS } from '../data';

const ComparacaoCompleta = () => {
  const apuracao = useApuracao();
  const candidatos = comCores(apuracao.candidatos);

  const ordenados = [...candidatos]
    .map((c) => ({ ...c, pct: percentual(c, candidatos) }))
    .sort((a, b) => b.votos - a.votos);

  const lider = ordenados[0];
  const segundo = ordenados[1];

  const nulos = apuracao.votosNulos ?? 0;
  const brancos = apuracao.votosBrancos ?? 0;
  const totalGeral = totalVotos(candidatos) + nulos + brancos;

  const itens = [
    {
      key: 'lider',
      label: '1º LUGAR',
      nome: lider?.nome || '-',
      pct: lider?.pct || 0,
      votos: lider?.votos || 0,
      cor: lider?.cor || CORES_ESPECIAIS.nulos,
      delay: 0,
    },
    {
      key: 'segundo',
      label: '2º LUGAR',
      nome: segundo?.nome || '-',
      pct: segundo?.pct || 0,
      votos: segundo?.votos || 0,
      cor: segundo?.cor || CORES_ESPECIAIS.nulos,
      delay: 0.1,
    },
    {
      key: 'nulos',
      label: 'NULOS',
      nome: 'Votos Nulos',
      pct: totalGeral ? (nulos / totalGeral) * 100 : 0,
      votos: nulos,
      cor: CORES_ESPECIAIS.nulos,
      delay: 0.2,
    },
    {
      key: 'brancos',
      label: 'BRANCOS',
      nome: 'Votos Brancos',
      pct: totalGeral ? (brancos / totalGeral) * 100 : 0,
      votos: brancos,
      cor: CORES_ESPECIAIS.brancos,
      delay: 0.3,
    },
  ];

  return (
    <>
      <GlobalStyle />
      <Page>
        <Card>
          <Badge>Comparação Completa</Badge>
          <Grid>
            {itens.map((item) => (
              <Item key={item.key} $delay={item.delay}>
                <ItemHeader>
                  <ItemDot $color={item.cor} />
                  <ItemLabel>{item.label}</ItemLabel>
                </ItemHeader>
                <ItemName>{item.nome}</ItemName>
                <ItemPct $color={item.cor}>{formatPct(item.pct)}%</ItemPct>
                <ItemVotos>{formatNumero(item.votos)} votos</ItemVotos>
              </Item>
            ))}
          </Grid>
          <Legend>
            <LegendItem>
              <LegendDot $color={lider?.cor || CORES_ESPECIAIS.nulos} />
              <strong>{lider?.nome || '-'}</strong> {formatPct(lider?.pct || 0)}%
            </LegendItem>
            <LegendItem>
              <LegendDot $color={segundo?.cor || CORES_ESPECIAIS.nulos} />
              <strong>{segundo?.nome || '-'}</strong> {formatPct(segundo?.pct || 0)}%
            </LegendItem>
            <LegendItem>
              <LegendDot $color={CORES_ESPECIAIS.nulos} />
              <strong>Nulos</strong> {formatPct(totalGeral ? (nulos / totalGeral) * 100 : 0)}%
            </LegendItem>
            <LegendItem>
              <LegendDot $color={CORES_ESPECIAIS.brancos} />
              <strong>Brancos</strong> {formatPct(totalGeral ? (brancos / totalGeral) * 100 : 0)}%
            </LegendItem>
          </Legend>
        </Card>
      </Page>
    </>
  );
};

export default ComparacaoCompleta;