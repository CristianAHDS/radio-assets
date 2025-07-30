import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import TempoGeral from './geral.jsx';
import TempoEsporte from './esporte.jsx';
import TempoFenadoce from './fenadoce.jsx';
import TempoConexao from './conexao.jsx';
import Lower from './lower.jsx';
import LowerEsporte from './lowerEsporte.jsx';
import LowerFenadoce from './lowerFenadoce.jsx';
import LowerConexao from './lowerConexao.jsx';
import Clock from './clock.jsx';
import ClockEsporte from './clockEsporte.jsx';
import ClockFenadoce from './clockFenadoce.jsx';
import ClockConexao from './clockConexao.jsx';
import Gc from './components/gc';
import Tabela from './components/tabela';
import Alert from './components/alerts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TempoGeral />,
  },
  {
    path: '/esporte',
    element: <TempoEsporte />,
  },
  {
    path: '/fenadoce',
    element: <TempoFenadoce />,
  },
  {
    path: '/conexao',
    element: <TempoConexao />,
  },
  {
    path: '/lower',
    element: <Lower />,
  },
  {
    path: '/lowerEsporte',
    element: <LowerEsporte />,
  },
  {
    path: '/lowerFenadoce',
    element: <LowerFenadoce />,
  },
  {
    path: '/lowerConexao',
    element: <LowerConexao />,
  },
  {
    path: '/clock',
    element: <Clock />,
  },
  {
    path: '/clockEsporte',
    element: <ClockEsporte />,
  },
  {
    path: '/clockFenadoce',
    element: <ClockFenadoce />,
  },
  {
    path: '/clockConexao',
    element: <ClockConexao />,
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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
