import ProgramacaoPage from './page';
import { PALETTES } from './palettes';

export const ProgramacaoGeral = () => <ProgramacaoPage colors={PALETTES.geral} />;
export const ProgramacaoEsporte = () => <ProgramacaoPage colors={PALETTES.esporte} />;
export const ProgramacaoConexao = () => <ProgramacaoPage colors={PALETTES.conexao} />;
export const ProgramacaoPensarNegocios = () => (
  <ProgramacaoPage colors={PALETTES.pensarNegocios} />
);
export const ProgramacaoOutros = () => <ProgramacaoPage colors={PALETTES.outros} />;
export const ProgramacaoCorpoEMente = () => (
  <ProgramacaoPage colors={PALETTES.corpoEMente} />
);
export const ProgramacaoPelotasMerece = () => (
  <ProgramacaoPage colors={PALETTES.pelotasMerece} />
);
export const ProgramacaoAHora = () => <ProgramacaoPage colors={PALETTES.aHora} />;