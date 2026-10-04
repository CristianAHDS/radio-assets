export const CORES_PARTIDOS = {
  AGIR: '#00796b',
  AVANTE: '#ef6c00',
  CIDADANIA: '#6a1b9a',
  DC: '#1565c0',
  DEMOCRATA: '#2962ff',
  MDB: '#1a7f3c',
  MISSÃO: '#689f38',
  NOVO: '#f58220',
  PCB: '#c62828',
  PCDOB: '#8e24aa',
  PCO: '#b71c1c',
  PDT: '#e02128',
  PL: '#1e6fd9',
  PODE: '#f9a825',
  PP: '#1f4e9c',
  PRD: '#1f6feb',
  PSB: '#e11a2c',
  PSD: '#0d84c4',
  PSDB: '#0b64a0',
  PSOL: '#ff7f00',
  PSTU: '#8e0000',
  PT: '#e30613',
  PV: '#00b84a',
  REDE: '#16a085',
  REPUBLICANOS: '#0055a4',
  SOLIDARIEDADE: '#ff6f00',
  'UNIÃO': '#2f8bdd',
  UP: '#ad1457',
};

const CORES_FALLBACK = [
  '#fbbf24',
  '#38bdf8',
  '#4ade80',
  '#f472b6',
  '#a78bfa',
  '#fb923c',
  '#22d3ee',
  '#e879f9',
];

export const siglaPartido = (partido) =>
  String(partido || '')
    .replace(/\s*-\s*\d+\s*$/, '')
    .trim()
    .toUpperCase();

export const corPartido = (partido) => {
  const sigla = siglaPartido(partido);
  if (CORES_PARTIDOS[sigla]) return CORES_PARTIDOS[sigla];

  let hash = 0;
  for (let i = 0; i < sigla.length; i += 1) {
    hash = (hash * 31 + sigla.charCodeAt(i)) | 0;
  }
  return CORES_FALLBACK[Math.abs(hash) % CORES_FALLBACK.length];
};
