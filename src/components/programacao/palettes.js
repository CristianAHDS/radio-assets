import {
  primary,
  secondary,
  primaryEstporte,
  secondaryEsporte,
  primaryConexão,
  secondaryConexão,
  primaryPensarNegocios,
  secondaryPensarNegocios,
  primaryOutros,
  secondaryOutros,
  primaryCorpoEMente,
  secondaryCorpoEMente,
  primaryPelotasMerece,
  secondaryPelotasMerece,
  ahoraPrimary,
  ahoraSecondary,
} from '../../constants/color';

const WHITE = '#FFFFFF';
const GRAY_BG = '#F5F5F5';
const GRAY_DARK = '#4A4A4A';

const base = (navy, navyAlt, blue) => ({
  navy,
  navyAlt,
  blue,
  white: WHITE,
  grayBg: GRAY_BG,
  grayDark: GRAY_DARK,
});

export const PALETTES = {
  geral: base(secondary, secondary, primary),
  esporte: base(secondaryEsporte, secondaryEsporte, primaryEstporte),
  conexao: base(secondaryConexão, secondaryConexão, primaryConexão),
  pensarNegocios: base(secondaryPensarNegocios, secondaryPensarNegocios, primaryPensarNegocios),
  outros: base(secondaryOutros, secondaryOutros, primaryOutros),
  corpoEMente: base(secondaryCorpoEMente, secondaryCorpoEMente, primaryCorpoEMente),
  pelotasMerece: base(secondaryPelotasMerece, secondaryPelotasMerece, primaryPelotasMerece),
  aHora: base(ahoraSecondary, ahoraSecondary, ahoraPrimary),
};

export default PALETTES;