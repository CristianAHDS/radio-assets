import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import TempoGeral from './geral.jsx';
import Esporte from './esporte.jsx';
import FenadoceTempo from './fenadoce.jsx';
import Lower from './lower.jsx';
import LowerEsporte from './lowerEsporte.jsx';
import Clock from './clock.jsx';
import ClockEsporte from './clockEsporte.jsx';
import AcordaZonaSul from './pages/acorda_zona_sul/index.jsx';
import Esportes from './pages/esportes/index.jsx';
import Fenadoce from './pages/fenadoce/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TempoGeral />,
  },
  {
    path: '/esporte',
    element: <Esporte />,
  },
  {
    path: '/fenadoceTempo',
    element: <FenadoceTempo />,
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
    path: '/clock',
    element: <Clock />,
  },
  {
    path: '/clockEsporte',
    element: <ClockEsporte />,
  },
  {
    path: '/acorda_zona_sul',
    element: <AcordaZonaSul />,
  },
  {
    path: '/esportes',
    element: <Esportes />,
  },
  {
    path: '/fenadoce',
    element: <Fenadoce />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
