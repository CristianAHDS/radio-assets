import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
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

//Esporte
import TempoEsporte from './esporte.jsx';
import LowerEsporte from './lowerEsporte.jsx';
import ClockEsporte from './clockEsporte.jsx';

//Conexão
import InstaConexao from './components/instaConexao';
import WhatsConexao from './components/whatsConexao';
import GcConexao from './components/gcConexao';
import ClockConexao from './clockConexao.jsx';
import TempoConexao from './conexao.jsx';
import PinConexao from './components/pinConexao';
import LowerConexao from './lowerConexao.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TempoGeral />,
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
    element: <Pin />
  },

  {
    path: '/whats',
    element: <Whats />
  },
  //Esporte
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

  //Conexao
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
    path: '/insta',
    element: <Insta />
  },
  {
    path: '/pinConexao',
    element: <PinConexao />
  },
  {
    path: '/whatsConexao',
    element: <WhatsConexao />
  },
  {
    path: '/instaConexao',
    element: <InstaConexao />
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
