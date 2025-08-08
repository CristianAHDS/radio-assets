import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Let from './components/let';
import TempoGeral from './geral.jsx';
import Lower from './lower.jsx';
import Clock from './clock.jsx';
import Gc from './components/gc';
import Tabela from './components/tabela';
import Alert from './components/alerts';
import Pin from './components/pin';
import Whats from './components/whats';
import Insta from './components/insta';
import Radar from './components/radar';
import Ticket from './components/ticket';
import Results from './components/results';

//Esporte
import LetEsporte from './components/letEsporte';
import TempoEsporte from './esporte.jsx';
import LowerEsporte from './lowerEsporte.jsx';
import ClockEsporte from './clockEsporte.jsx';
import GcEsporte from './components/gcEsporte';
import InstaEsporte from './components/instaEsporte';
import WhatsEsporte from './components/whatsEsporte';
import PinEsporte from './components/pinEsporte';

//Pensar Negócios
import TempoPensarnegocios from './components/tempoPensarNegocios';
import LowerPersnarNegocios from './components/lowerPensarNegocios';
import GcPensarNegocios from './components/gcPensarNegocios';
import ClockPensarNegocios from './components/clockPensarNegocios';
import WhatsPensarNegocios from './components/whatsPensarNegocios';
import InstaPensarNegocios from './components/instaPensarNegocios';
import PinPensarNegocios from './components/pinPensarNegocios';

//Conexão
import LetConexao from './components/letConexao';
import InstaConexao from './components/instaConexao';
import WhatsConexao from './components/whatsConexao';
import GcConexao from './components/gcConexao';
import ClockConexao from './clockConexao.jsx';
import TempoConexao from './conexao.jsx';
import PinConexao from './components/pinConexao';
import LowerConexao from './lowerConexao.jsx';

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
import InstaCorpoEMente from './components/instaCorpoEMente';
import WhatsCorpoEMente from './components/whatsCorpoEMente';

//Pelotas Merece
import ClockPelotasMerece from './components/clockPelotasMerece';
import TempoPelotasMerece from './components/tempoPelotasMerece';
import LowerPelotasMerece from './components/lowerPelotasMerece';
import GcPelotasMerece from './components/gcPelotasMerece';
import PinPelotasMerece from './components/pinPelotasMerece';
import InstaPelotasMerece from './components/instaPelotasMerece';
import WhatsPelotasMerece from './components/whatsPelotasMerece';

const router = createBrowserRouter([
  { path: '/insta', element: <Insta /> },
  { path: '/ticket', element: <Ticket /> },
  { path: '/let', element: <Let /> },
  { path: '/', element: <TempoGeral /> },
  { path: '/radar', element: <Radar /> },
  { path: '/lower', element: <Lower /> },
  { path: '/clock', element: <Clock /> },
  { path: '/gc', element: <Gc /> },
  { path: '/tabela', element: <Tabela /> },
  { path: '/alert', element: <Alert /> },
  { path: '/pin', element: <Pin /> },
  { path: '/whats', element: <Whats /> },
  { path: '/results', element: <Results /> },

  //Esporte
  { path: '/whatsEsporte', element: <WhatsEsporte /> },
  { path: '/clockEsporte', element: <ClockEsporte /> },
  { path: '/lowerEsporte', element: <LowerEsporte /> },
  { path: '/esporte', element: <TempoEsporte /> },
  { path: '/gcEsporte', element: <GcEsporte /> },
  { path: '/letEsporte', element: <LetEsporte /> },
  { path: '/instaEsporte', element: <InstaEsporte /> },
  { path: '/pinEsporte', element: <PinEsporte /> },

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

  //Pensar Negocios
  { path: '/lowerPensarNegocios', element: <LowerPersnarNegocios /> },
  { path: '/gcPensarNegocios', element: <GcPensarNegocios /> },
  { path: '/clockPensarNegocios', element: <ClockPensarNegocios /> },
  { path: '/pensarNegocios', element: <TempoPensarnegocios /> },
  { path: '/whatsPensarNegocios', element: <WhatsPensarNegocios /> },
  { path: '/instaPensarNegocios', element: <InstaPensarNegocios /> },
  { path: '/pinPensarNegocios', element: <PinPensarNegocios /> },

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

  //Pelotas Merece
  { path: '/clockPelotasMerece', element: <ClockPelotasMerece /> },
  { path: '/pelotasMerece', element: <TempoPelotasMerece /> },
  { path: '/lowerPelotasMerece', element: <LowerPelotasMerece /> },
  { path: '/gcPelotasMerece', element: <GcPelotasMerece /> },
  { path: '/pinPelotasMerece', element: <PinPelotasMerece /> },
  { path: '/whatsPelotasMerece', element: <WhatsPelotasMerece /> },
  { path: '/instaPelotasMerece', element: <InstaPelotasMerece /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
