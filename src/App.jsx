import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import PageCorpoEMente from './pages/corpoEMente';
import PagePelotasMerece from './pages/pelotasMerece';
import PageOutros from './pages/outros';
import PageEsportes from './pages/esportes';
import PagePadrao from './pages/padrao';
import PageConexao from './pages/conexao';
import Let from './components/let';
import TempoGeral from './geral.jsx';
import Lower from './lower.jsx';
import Clock from './clock.jsx';
import Gc from './components/gc';
import GcMusica from './components/gcMusica';
import GcMusicaConexao from './components/gcMusicaConexao';
import GcMusicaEsporte from './components/gcMusicaEsporte';
import GcMusicaPensarNegocios from './components/gcMusicaPensarNegocios';
import GcMusicaOutros from './components/gcMusicaOutros';
import GcMusicaCorpoEMente from './components/gcMusicaCorpoEMente';
import GcMusicaPelotasMerece from './components/gcMusicaPelotasMerece';
import Tabela from './components/tabela';
import Alert from './components/alerts';
import Pin from './components/pin';
import Whats from './components/whats';
import Insta from './components/insta';
import Radar from './components/radar';
import Ticket from './components/ticket';
import Results from './components/results';
import QrCode from './components/qrCode';
import CamTp from './components/camTp';
import Gravado from './components/gravado';

//Esporte
import LetEsporte from './components/letEsporte';
import TempoEsporte from './esporte.jsx';
import LowerEsporte from './lowerEsporte.jsx';
import ClockEsporte from './clockEsporte.jsx';
import GcEsporte from './components/gcEsporte';
import InstaEsporte from './components/instaEsporte';
import WhatsEsporte from './components/whatsEsporte';
import PinEsporte from './components/pinEsporte';
import CamTpEsporte from './components/camTpEsporte';

//Pensar Negócios
import TempoPensarnegocios from './components/tempoPensarNegocios';
import LowerPersnarNegocios from './components/lowerPensarNegocios';
import GcPensarNegocios from './components/gcPensarNegocios';
import ClockPensarNegocios from './components/clockPensarNegocios';
import WhatsPensarNegocios from './components/whatsPensarNegocios';
import InstaPensarNegocios from './components/instaPensarNegocios';
import PinPensarNegocios from './components/pinPensarNegocios';
import CamTpPensarNegocios from './components/camTpPensarNegocios';

//Conexão
import LetConexao from './components/letConexao';
import InstaConexao from './components/instaConexao';
import WhatsConexao from './components/whatsConexao';
import GcConexao from './components/gcConexao';
import ClockConexao from './clockConexao.jsx';
import TempoConexao from './conexao.jsx';
import PinConexao from './components/pinConexao';
import LowerConexao from './lowerConexao.jsx';
import CamTpConexao from './components/camTpConexao';

//Outros
import ClockOutros from './components/clockOutros';
import TempoOutros from './components/tempoOutros';
import LowerOutros from './components/lowerOutros';
import GcOutros from './components/gcOutros';
import PinOutros from './components/pinOutros';
import InstaOutros from './components/instaOutros';
import WhatsOutros from './components/whatsOutros';

//Corpo e Mente
import ClockCorpoEMente from './components/clockCorpoEMente';
import TempoCorpoEMente from './components/tempoCorpoEMente';
import LowerCorpoEMente from './components/lowerCorpoEMente';
import GcCorpoEMente from './components/gcCorpoEMente';
import PinCorpoEMente from './components/pinCorpoEMente';
import WhatsCorpoEMente from './components/whatsCorpoEMente';
import InstaCorpoEMente from './components/instaCorpoEMente';
import CamTpCorpoEMente from './components/camTpCorpoEMente';

//Pelotas Merece
import ClockPelotasMerece from './components/clockPelotasMerece';
import TempoPelotasMerece from './components/tempoPelotasMerece';
import LowerPelotasMerece from './components/lowerPelotasMerece';
import GcPelotasMerece from './components/gcPelotasMerece';
import PinPelotasMerece from './components/pinPelotasMerece';
import InstaPelotasMerece from './components/instaPelotasMerece';
import WhatsPelotasMerece from './components/whatsPelotasMerece';
import CamTpPelotasMerece from './components/CamTpPelotasMerece';

//AHORA
import ClockAHora from './components/clockAHora';
import LowerAHora from './components/lowerAHora';
import GcAHora from './components/gcAHora';
import PinAHora from './components/pinAHora';
import TempoAHora from './components/tempoAHora';
import Lajeado from './components/tempoAHora/lajeado.jsx';

//CAMS
import CamUna from './components/camUna';
import CamRioGrande from './components/camRioGrande';
import CamShopping from './components/camShopping';

//New Components
import NewClock from './components/newVersion/ClockNewVersion';
import NewTempo from './components/newVersion/TempoNewVersion';
import NewGC from './components/newVersion/GCNew';
import NewGCMusica from './components/newVersion/gcMusica';
import NewWhats from './components/newVersion/whats'
import NewCamTp from './components/newVersion/camTp'

//New Defaukt
import DefaultClock from './components/newDefault/ClockNewVersion';
import DefaultTempo from './components/newDefault/TempoNewVersion';
import DefaultGC from './components/newDefault/GCNew';
import DefaultGCMusica from './components/newDefault/gcMusica';
import DefaultWhats from './components/newDefault/whats'
import DefaultCamTp from './components/newDefault/camTp'

import NewClockExpo from './components/expoFeira/ClockNewVersion';
import NewTempoExpo from './components/expoFeira/TempoNewVersion';


const router = createBrowserRouter([
  // Deafautl Components
  { path: '/defaultClock', element: <DefaultClock /> },
  { path: '/defaultTempo', element: <DefaultTempo /> },
  { path: '/defaultGC', element: <DefaultGC/> },
  { path: '/defaultGcMuisca', element: <DefaultGCMusica/> },
  { path: '/defaultCamTp', element: <DefaultCamTp/> },
  { path: '/defaultWhats', element: <DefaultWhats/> },

  // New Components
  { path: '/newClock', element: <NewClock /> },
  { path: '/newTempo', element: <NewTempo /> },
  { path: '/newGC', element: <NewGC/> },
  { path: '/newGcMuisca', element: <NewGCMusica/> },
  { path: '/newCamTp', element: <NewCamTp/> },
  { path: '/newWhats', element: <NewWhats/> },

  { path: '/newClockExpo', element: <NewClockExpo /> },
  { path: '/newTempoExpo', element: <NewTempoExpo /> },

  // Pages
  { path: '/pageCorpoEMente', element: <PageCorpoEMente /> },
  { path: '/pagePelotasMerece', element: <PagePelotasMerece /> },
  { path: '/pageOutros', element: <PageOutros /> },
  { path: '/pageEsportes', element: <PageEsportes /> },
  { path: '/pagePadrao', element: <PagePadrao /> },
  { path: '/pageConexao', element: <PageConexao /> },

  { path: '/insta', element: <Insta /> },
  { path: '/ticket', element: <Ticket /> },
  { path: '/let', element: <Let /> },
  { path: '/', element: <TempoGeral /> },
  { path: '/radar', element: <Radar /> },
  { path: '/lower', element: <Lower /> },
  { path: '/clock', element: <Clock /> },
  { path: '/gc', element: <Gc /> },
  { path: '/gcMusica', element: <GcMusica /> },
  { path: '/gcMusicaEsporte', element: <GcMusicaEsporte /> },
  { path: '/gcMusicaConexao', element: <GcMusicaConexao /> },
  { path: '/gcMusicaPensarNegocios', element: <GcMusicaPensarNegocios /> },
  { path: '/gcMusicaOutros', element: <GcMusicaOutros /> },
  { path: '/gcMusicaCorpoEMente', element: <GcMusicaCorpoEMente /> },
  { path: '/gcMusicaPelotasMerece', element: <GcMusicaPelotasMerece /> },
  { path: '/tabela', element: <Tabela /> },
  { path: '/alert', element: <Alert /> },
  { path: '/pin', element: <Pin /> },
  { path: '/whats', element: <Whats /> },
  { path: '/results', element: <Results /> },
  { path: '/qrCode', element: <QrCode /> },
  { path: '/camTp', element: <CamTp /> },
  { path: '/gravado', element: <Gravado /> },

  //Esporte
  { path: '/whatsEsporte', element: <WhatsEsporte /> },
  { path: '/clockEsporte', element: <ClockEsporte /> },
  { path: '/lowerEsporte', element: <LowerEsporte /> },
  { path: '/esporte', element: <TempoEsporte /> },
  { path: '/gcEsporte', element: <GcEsporte /> },
  { path: '/letEsporte', element: <LetEsporte /> },
  { path: '/instaEsporte', element: <InstaEsporte /> },
  { path: '/pinEsporte', element: <PinEsporte /> },
  { path: '/camTpEsporte', element: <CamTpEsporte /> },

  //Conexão
  { path: '/letConexao', element: <LetConexao /> },
  { path: '/conexao', element: <TempoConexao /> },
  { path: '/lowerConexao', element: <LowerConexao /> },
  { path: '/clockConexao', element: <ClockConexao /> },
  // rota dinâmica aceitando um nome
  { path: '/gcConexao', element: <GcConexao /> },
  { path: '/pinConexao', element: <PinConexao /> },
  { path: '/whatsConexao', element: <WhatsConexao /> },
  { path: '/instaConexao', element: <InstaConexao /> },
  { path: '/camTpConexao', element: <CamTpConexao /> },

  //Pensar Negocios
  { path: '/lowerPensarNegocios', element: <LowerPersnarNegocios /> },
  { path: '/gcPensarNegocios', element: <GcPensarNegocios /> },
  { path: '/clockPensarNegocios', element: <ClockPensarNegocios /> },
  { path: '/pensarNegocios', element: <TempoPensarnegocios /> },
  { path: '/whatsPensarNegocios', element: <WhatsPensarNegocios /> },
  { path: '/instaPensarNegocios', element: <InstaPensarNegocios /> },
  { path: '/pinPensarNegocios', element: <PinPensarNegocios /> },
  { path: '/camTpPensarNegocios', element: <CamTpPensarNegocios /> },

  //Outros
  { path: '/clockOutros', element: <ClockOutros /> },
  { path: '/outros', element: <TempoOutros /> },
  { path: '/lowerOutros', element: <LowerOutros /> },
  { path: '/gcOutros', element: <GcOutros /> },
  { path: '/pinOutros', element: <PinOutros /> },
  { path: '/whatsOutros', element: <WhatsOutros /> },
  { path: '/instaOutros', element: <InstaOutros /> },

  //Corpo e Mente
  { path: '/clockCorpoEMente', element: <ClockCorpoEMente /> },
  { path: '/corpoEMente', element: <TempoCorpoEMente /> },
  { path: '/lowerCorpoEMente', element: <LowerCorpoEMente /> },
  { path: '/gcCorpoEMente', element: <GcCorpoEMente /> },
  { path: '/pinCorpoEMente', element: <PinCorpoEMente /> },
  { path: '/whatsCorpoEMente', element: <WhatsCorpoEMente /> },
  { path: '/instaCorpoEMente', element: <InstaCorpoEMente /> },
  { path: '/camTpCorpoEMente', element: <CamTpCorpoEMente /> },

  //Pelotas Merece
  { path: '/clockPelotasMerece', element: <ClockPelotasMerece /> },
  { path: '/pelotasMerece', element: <TempoPelotasMerece /> },
  { path: '/lowerPelotasMerece', element: <LowerPelotasMerece /> },
  { path: '/gcPelotasMerece', element: <GcPelotasMerece /> },
  { path: '/pinPelotasMerece', element: <PinPelotasMerece /> },
  { path: '/whatsPelotasMerece', element: <WhatsPelotasMerece /> },
  { path: '/instaPelotasMerece', element: <InstaPelotasMerece /> },
  { path: '/CamTpPelotasMerece', element: <CamTpPelotasMerece /> },

  //AHORA
  { path: '/clockAHora', element: <ClockAHora /> },
  { path: '/LowerAHora', element: <LowerAHora /> },
  { path: '/gcAHora', element: <GcAHora /> },
  { path: '/pinAHora', element: <PinAHora /> },
  { path: '/aHora', element: <TempoAHora /> },
  { path: '/lajeado', element: <Lajeado /> },

  //CAMS
  { path: '/camUna', element: <CamUna /> },
  { path: '/camRioGrande', element: <CamRioGrande /> },
  { path: '/camShopping', element: <CamShopping /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
