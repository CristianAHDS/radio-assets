const nomeParam = { key: 'nome', label: 'Nome', default: 'Teste' };
const localParam = { key: 'local', label: 'Local', default: 'Estúdio' };

export const GROUPS = [
  {
    title: 'Telas',
    items: [
      { name: 'Tela Geral', path: '/telas/tela-geral' },
      { name: 'Tela Esporte', path: '/telas/tela-esporte' },
      { name: 'Tela Conexão', path: '/telas/tela-conexao' },
      { name: 'Tela Pensar Negócios', path: '/telas/tela-pensar-negocios' },
      { name: 'Tela Outros', path: '/telas/tela-outros' },
      { name: 'Tela Corpo e Mente', path: '/telas/tela-corpo-mente' },
      { name: 'Tela Pelotas Merece', path: '/telas/tela-pelotas-merece' },
      { name: 'Tela A Hora', path: '/telas/tela-a-hora' },
      { name: 'Tela Gravação', path: '/telas/tela-gravacao' },
    ],
  },
  {
    title: 'Default Novo',
    items: [
      { name: 'Clock Default', path: '/defaultClock' },
      { name: 'Tempo Default', path: '/defaultTempo' },
      { name: 'GC Default', path: '/defaultGC', params: [nomeParam] },
      { name: 'GC Música Default', path: '/defaultGcMuisca', params: [nomeParam] },
      { name: 'WhatsApp Default', path: '/defaultWhats' },
      { name: 'Câmeras TP Default', path: '/defaultCamTp', params: [localParam] },
    ],
  },
  {
    title: 'Mistura Boa Novo',
    items: [
      { name: 'Clock Mistura Boa', path: '/newClock' },
      { name: 'Tempo Mistura Boa', path: '/newTempo' },
      { name: 'GC Mistura Boa', path: '/newGC', params: [nomeParam] },
      { name: 'GC Música Mistura Boa', path: '/newGcMuisca', params: [nomeParam] },
      { name: 'WhatsApp Mistura Boa', path: '/newWhats' },
      { name: 'Câmeras TP Mistura Boa', path: '/newCamTp', params: [localParam] },
    ],
  },
  {
    title: 'Default Novo Pelotas Merece',
    items: [
      { name: 'Clock Default Pelotas Merece', path: '/defaultClockPelotasMerece' },
      { name: 'Tempo Default Pelotas Merece', path: '/defaultTempoPelotasMerece' },
      { name: 'GC Default Pelotas Merece', path: '/defaultGCPelotasMerece', params: [nomeParam] },
      { name: 'GC Música Default Pelotas Merece', path: '/defaultGCMusicaPelotasMerece', params: [nomeParam] },
      { name: 'WhatsApp Default Pelotas Merece', path: '/defaultWhatsPelotasMerece' },
      { name: 'Câmeras TP Default Pelotas Merece', path: '/defaultCamTpPelotasMerece', params: [localParam] },
    ],
  },
  {
    title: 'ExpoFeira Novo',
    items: [
      { name: 'Clock ExpoFeira', path: '/newClockExpo' },
      { name: 'Tempo ExpoFeira', path: '/newTempoExpo' },
    ],
  },
  {
    title: 'Cenas (Tempo)',
    items: [
      { name: 'Tempo Geral', path: '/' },
      { name: 'Tempo Esporte', path: '/esporte' },
      { name: 'Tempo Conexão', path: '/conexao' },
      { name: 'Tempo Pensar Negócios', path: '/pensarNegocios' },
      { name: 'Tempo Outros', path: '/outros' },
      { name: 'Tempo Corpo e Mente', path: '/corpoEMente' },
      { name: 'Tempo Pelotas Merece', path: '/pelotasMerece' },
    ],
  },
  {
    title: 'Páginas',
    items: [
      { name: 'Página Padrão', path: '/pagePadrao' },
      { name: 'Página Esportes', path: '/pageEsportes' },
      { name: 'Página Conexão', path: '/pageConexao' },
      { name: 'Página Outros', path: '/pageOutros' },
      { name: 'Página Corpo e Mente', path: '/pageCorpoEMente' },
      { name: 'Página Pelotas Merece', path: '/pagePelotasMerece' },
    ],
  },
  {
    title: 'Relógios',
    items: [
      { name: 'Relógio Geral', path: '/clock' },
      { name: 'Relógio Esporte', path: '/clockEsporte' },
      { name: 'Relógio Conexão', path: '/clockConexao' },
      { name: 'Relógio Pensar Negócios', path: '/clockPensarNegocios' },
      { name: 'Relógio Outros', path: '/clockOutros' },
      { name: 'Relógio Corpo e Mente', path: '/clockCorpoEMente' },
      { name: 'Relógio Pelotas Merece', path: '/clockPelotasMerece' },
      { name: 'Relógio A Hora', path: '/clockAHora' },
    ],
  },
  {
    title: 'Lower',
    items: [
      { name: 'Lower Teste (Portal)', path: '/lowerTeste' },
      { name: 'Lower Geral', path: '/lower' },
      { name: 'Lower Esporte', path: '/lowerEsporte' },
      { name: 'Lower Conexão', path: '/lowerConexao' },
      { name: 'Lower Pensar Negócios', path: '/lowerPensarNegocios' },
      { name: 'Lower Outros', path: '/lowerOutros' },
      { name: 'Lower Corpo e Mente', path: '/lowerCorpoEMente' },
      { name: 'Lower Pelotas Merece', path: '/lowerPelotasMerece' },
      { name: 'Lower A Hora', path: '/LowerAHora' },
    ],
  },
  {
    title: 'Instagram',
    items: [
      { name: 'Instagram Geral', path: '/insta' },
      { name: 'Instagram Esporte', path: '/instaEsporte' },
      { name: 'Instagram Conexão', path: '/instaConexao' },
      { name: 'Instagram Pensar Negócios', path: '/instaPensarNegocios' },
      { name: 'Instagram Outros', path: '/instaOutros' },
      { name: 'Instagram Corpo e Mente', path: '/instaCorpoEMente' },
      { name: 'Instagram Pelotas Merece', path: '/instaPelotasMerece' },
    ],
  },
  {
    title: 'WhatsApp',
    items: [
      { name: 'WhatsApp Geral', path: '/whats' },
      { name: 'WhatsApp Esporte', path: '/whatsEsporte' },
      { name: 'WhatsApp Conexão', path: '/whatsConexao' },
      { name: 'WhatsApp Pensar Negócios', path: '/whatsPensarNegocios' },
      { name: 'WhatsApp Outros', path: '/whatsOutros' },
      { name: 'WhatsApp Corpo e Mente', path: '/whatsCorpoEMente' },
      { name: 'WhatsApp Pelotas Merece', path: '/whatsPelotasMerece' },
    ],
  },
  {
    title: 'Pin',
    items: [
      { name: 'Pin Geral', path: '/pin' },
      { name: 'Pin Esporte', path: '/pinEsporte' },
      { name: 'Pin Conexão', path: '/pinConexao' },
      { name: 'Pin Pensar Negócios', path: '/pinPensarNegocios' },
      { name: 'Pin Outros', path: '/pinOutros' },
      { name: 'Pin Corpo e Mente', path: '/pinCorpoEMente' },
      { name: 'Pin Pelotas Merece', path: '/pinPelotasMerece' },
      { name: 'Pin A Hora', path: '/pinAHora' },
    ],
  },
  {
    title: 'Let',
    items: [
      { name: 'Let Geral', path: '/let', params: [nomeParam] },
      { name: 'Let Esporte', path: '/letEsporte', params: [nomeParam] },
      { name: 'Let Conexão', path: '/letConexao', params: [nomeParam] },
    ],
  },
  {
    title: 'GC',
    items: [
      { name: 'GC Geral', path: '/gc', params: [nomeParam] },
      { name: 'GC Esporte', path: '/gcEsporte', params: [nomeParam] },
      { name: 'GC Conexão', path: '/gcConexao', params: [nomeParam] },
      { name: 'GC Pensar Negócios', path: '/gcPensarNegocios', params: [nomeParam] },
      { name: 'GC Outros', path: '/gcOutros', params: [nomeParam] },
      { name: 'GC Corpo e Mente', path: '/gcCorpoEMente', params: [nomeParam] },
      { name: 'GC Pelotas Merece', path: '/gcPelotasMerece', params: [nomeParam] },
      { name: 'GC A Hora', path: '/gcAHora', params: [nomeParam] },
    ],
  },
  {
    title: 'GC Música',
    items: [
      { name: 'GC Música Geral', path: '/gcMusica', params: [nomeParam] },
      { name: 'GC Música Esporte', path: '/gcMusicaEsporte', params: [nomeParam] },
      { name: 'GC Música Conexão', path: '/gcMusicaConexao', params: [nomeParam] },
      { name: 'GC Música Pensar Negócios', path: '/gcMusicaPensarNegocios', params: [nomeParam] },
      { name: 'GC Música Outros', path: '/gcMusicaOutros', params: [nomeParam] },
      { name: 'GC Música Corpo e Mente', path: '/gcMusicaCorpoEMente', params: [nomeParam] },
      { name: 'GC Música Pelotas Merece', path: '/gcMusicaPelotasMerece', params: [nomeParam] },
    ],
  },
  {
    title: 'Loc Câmera',
    items: [
      { name: 'Loc. Câmera Geral', path: '/camTp', params: [localParam] },
      { name: 'Loc. Câmera Esporte', path: '/camTpEsporte', params: [localParam] },
      { name: 'Loc. Câmera Conexão', path: '/camTpConexao', params: [localParam] },
      { name: 'Loc. Câmera Pensar Negócios', path: '/camTpPensarNegocios', params: [localParam] },
      { name: 'Loc. Câmera Corpo e Mente', path: '/camTpCorpoEMente', params: [localParam] },
      { name: 'Loc. Câmera Pelotas Merece', path: '/CamTpPelotasMerece', params: [localParam] },
    ],
  },
  {
    title: 'Câmeras',
    items: [
      { name: 'Câmera Una', path: '/camUna' },
      { name: 'Câmera Rio Grande', path: '/camRioGrande' },
      { name: 'Câmera Shopping', path: '/camShopping' },
    ],
  },
  {
    title: 'Grupo A Hora',
    items: [
      { name: 'Tempo Região', path: '/aHora' },
      { name: 'Tempo Somente Lajeado', path: '/lajeado' },
    ],
  },
  {
    title: 'Esportes',
    items: [
      { name: 'Game Results', path: '/gameResult' },
      { name: 'Live Score', path: '/liveScore' },
      { name: 'Live Score Lower', path: '/liveScoreLower' },
    ],
  },
  {
    title: 'Adicionais',
    items: [
      { name: 'Radar', path: '/radar' },
      { name: 'Tabela', path: '/tabela' },
      { name: 'Alert', path: '/alert' },
      { name: 'Ticket', path: '/ticket' },
      { name: 'Results', path: '/results' },
      {
        name: 'QR Code',
        path: '/qrCode',
        params: [
          { key: 'link', label: 'Link', default: 'https://ahoradosul.com.br/' },
          { key: 'text', label: 'Texto', default: 'Teste' },
        ],
      },
      { name: 'Gravado', path: '/gravado' },
    ],
  },
  {
    title: 'Gravação',
    items: [
      { name: 'Gravado', path: '/gravado' },
      { name: 'REC', path: '/rec' },
      { name: 'No Ar', path: '/noAr' },
      { name: 'Ao Vivo', path: '/aovivo' },
      { name: 'Retransmissão', path: '/retransmissao' },
      { name: 'Lower Gravação', path: '/lowerGravado' },
    ],
  },
  {
    title: 'UNO',
    items: [{ name: 'Escala Casa', path: '/Uno/EscalaCasa' }],
  },
];