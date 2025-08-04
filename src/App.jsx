import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Let from './components/let';
import TempoGeral from './geral.jsx';
import TempoFenadoce from './fenadoce.jsx';
import Lower from './lower.jsx';
import LowerFenadoce from './lowerFenadoce.jsx';
import Clock from './clock.jsx';
import ClockFenadoce from './clockFenadoce.jsx';
import Gc from './components/gc';
import Tabela from './components/tabela';
import Alert from './components/alerts';
import Pin from './components/pin';
import Whats from './components/whats';
import Insta from './components/insta';
import Radar from './components/radar';
import Ticket from './components/ticket';

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

const router = createBrowserRouter([
  {
    path: '/insta',
    element: <Insta />,
  },
  {
    path: '/ticket',
    element: <Ticket />,
  },
  {
    path: '/let',
    element: <Let />,
  },
  {
    path: '/',
    element: <TempoGeral />,
  },
  {
    path: '/radar',
    element: <Radar />,
  },
  {
    path: '/fenadoce',
    element: <TempoFenadoce />,
  },
  {
    path: '/lower',
    element: <Lower />,
  },
  {
    path: '/lowerFenadoce',
    element: <LowerFenadoce />,
  },
  {
    path: '/clock',
    element: <Clock />,
  },
  {
    path: '/clockFenadoce',
    element: <ClockFenadoce />,
  },
  {
    path: '/gc',
    element: <Gc />,
  },
  {
    path: '/tabela',
    element: <Tabela />,
  },
  {
    path: '/alert',
    element: <Alert />,
  },
  {
    path: '/pin',
    element: <Pin />,
  },
  {
    path: '/whats',
    element: <Whats />,
  },

  //Esporte
  {
    path: '/whatsEsporte',
    element: <WhatsEsporte />,
  },
  {
    path: '/clockEsporte',
    element: <ClockEsporte />,
  },
  {
    path: '/lowerEsporte',
    element: <LowerEsporte />,
  },
  {
    path: '/esporte',
    element: <TempoEsporte />,
  },
  {
    path: '/gcEsporte',
    element: <GcEsporte />,
  },
  {
    path: '/letEsporte',
    element: <LetEsporte />,
  },
  {
    path: '/instaEsporte',
    element: <InstaEsporte />,
  },
  {
    path: '/pinEsporte',
    element: <PinEsporte />,
  },

  //Conexao
  {
    path: '/letConexao',
    element: <LetConexao />,
  },
  {
    path: '/conexao',
    element: <TempoConexao />,
  },
  {
    path: '/lowerConexao',
    element: <LowerConexao />,
  },
  {
    path: '/clockConexao',
    element: <ClockConexao />,
  },
  {
    path: '/gcConexao',
    element: <GcConexao />,
  },
  {
    path: '/pinConexao',
    element: <PinConexao />,
  },
  {
    path: '/whatsConexao',
    element: <WhatsConexao />,
  },
  {
    path: '/instaConexao',
    element: <InstaConexao />,
  },

  //Pensar Negocios
  {
    path: '/lowerPensarNegocios',
    element: <LowerPersnarNegocios />,
  },
  {
    path: '/gcPensarNegocios',
    element: <GcPensarNegocios />,
  },
  {
    path: '/clockPensarNegocios',
    element: <ClockPensarNegocios />,
  },
  {
    path: '/pensarNegocios',
    element: <TempoPensarnegocios />,
  },
  {
    path: '/whatsPensarNegocios',
    element: <WhatsPensarNegocios />,
  },
  {
    path: '/instaPensarNegocios',
    element: <InstaPensarNegocios />,
  },
  {
    path: '/pinPensarNegocios',
    element: <PinPensarNegocios />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
