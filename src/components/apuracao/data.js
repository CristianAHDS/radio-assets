export const SECOES_TOTAIS = 120;
export const SECOES_APURADAS_INICIAL = 87;

export const APURACAO_CONFIG = {
  ambiente: 'oficial',
  ciclo: 'ele2022',
  eleicao: '544',
  uf: 'br',
  cargo: '1',
  municipio: '',
  zona: '',
  formato: 'simplificado',
};

export const CORES_CANDIDATOS = [
  '#fbbf24',
  '#38bdf8',
  '#4ade80',
  '#f472b6',
  '#a78bfa',
  '#fb923c',
  '#22d3ee',
  '#e879f9',
];

export const CANDIDATOS_INICIAIS = [
  { numero: 10, nome: 'Chapa 1 - Renovação', cor: '#fbbf24', votos: 22145 },
  { numero: 20, nome: 'Chapa 2 - União', cor: '#38bdf8', votos: 18432 },
  { numero: 30, nome: 'Chapa 3 - Participação', cor: '#4ade80', votos: 11733 },
];

export const CORES = {
  primaria: '#05306a',
  secundaria: '#001d41',
  texto: '#ffffff',
  textoSuave: '#94a3b8',
  ouro: '#fbbf24',
};

export const ZONAS_RECENTES = [
  'Zona 105 apurada',
  'Zona 88 apurada',
  'Zona 73 apurada',
  'Zona 124 apurada',
  'Zona 91 apurada',
  'Zona 67 apurada',
  'Zona 112 apurada',
  'Zona 59 apurada',
  'Zona 101 apurada',
  'Zona 80 apurada',
];

export const totalVotos = (candidatos) =>
  candidatos.reduce((acc, c) => acc + c.votos, 0);

export const comCores = (candidatos) =>
  candidatos.map((cand, i) => ({
    ...cand,
    cor: cand.cor || CORES_CANDIDATOS[i % CORES_CANDIDATOS.length],
  }));

export const percentual = (candidato, candidatos) => {
  const total = totalVotos(candidatos);
  return total === 0 ? 0 : (candidato.votos / total) * 100;
};

export const formatNumero = (n) => n.toLocaleString('pt-BR');

export const formatPct = (n) =>
  n.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });