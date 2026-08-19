const CLOCK = (src) => ({
  type: 'clock',
  src,
  top: '48px',
  left: '116px',
  width: '235px',
  height: '50px',
});

const LOWER = (src) => ({
  type: 'lower',
  src,
  bottom: '40px',
  left: '50%',
  width: 'calc(100% - 230px)',
  height: '44px',
  transform: 'translateX(-50%)',
});

const LOGO = {
  type: 'logo',
  src: '/logo',
  top: '5px',
  right: '-94px',
  width: 'auto',
  height: '140px',
};

const BLOCK = {
  type: 'blocoBranco',
  src: '/blocoBranco',
  bottom: '-365px',
  left: '116px',
  width: '100%',
  height: '100%',
};

export const TELAS = [
  {
    id: 'tela-geral',
    name: 'Tela Geral',
    components: [CLOCK('/clock'), LOGO, BLOCK, LOWER('/lower')],
  },
  {
    id: 'tela-esporte',
    name: 'Tela Esporte',
    components: [CLOCK('/clockEsporte'), LOGO, BLOCK, LOWER('/lowerEsporte')],
  },
  {
    id: 'tela-conexao',
    name: 'Tela Conexão',
    components: [CLOCK('/clockConexao'), LOGO, BLOCK, LOWER('/lowerConexao')],
  },
  {
    id: 'tela-pensar-negocios',
    name: 'Tela Pensar Negócios',
    components: [
      CLOCK('/clockPensarNegocios'),
      LOGO,
      BLOCK,
      LOWER('/lowerPensarNegocios'),
    ],
  },
  {
    id: 'tela-outros',
    name: 'Tela Outros',
    components: [CLOCK('/clockOutros'), LOGO, BLOCK, LOWER('/lowerOutros')],
  },
  {
    id: 'tela-corpo-mente',
    name: 'Tela Corpo e Mente',
    components: [CLOCK('/clockCorpoEMente'), LOGO, BLOCK, LOWER('/lowerCorpoEMente')],
  },
  {
    id: 'tela-pelotas-merece',
    name: 'Tela Pelotas Merece',
    components: [
      CLOCK('/clockPelotasMerece'),
      LOGO,
      BLOCK,
      LOWER('/lowerPelotasMerece'),
    ],
  },
  {
    id: 'tela-a-hora',
    name: 'Tela A Hora',
    components: [CLOCK('/clockAHora'), LOGO, BLOCK, LOWER('/LowerAHora')],
  },
  {
    id: 'tela-gravacao',
    name: 'Tela Gravação',
    components: [
      {
        type: 'gravado',
        src: '/gravado',
        top: '48px',
        left: '116px',
        width: '300px',
        height: '50px',
      },
      LOGO,
      BLOCK,
      LOWER('/lowerGravado'),
    ],
  },
];