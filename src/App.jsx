import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import TempoGeral from './geral.jsx';
import TempoEsporte from './esporte.jsx';
import TempoFenadoce from './fenadoce.jsx';
import Lower from './lower.jsx';
import LowerEsporte from './lowerEsporte.jsx';
import LowerFenadoce from './lowerFenadoce.jsx';
import Clock from './clock.jsx';
import ClockEsporte from './clockEsporte.jsx';
import ClockFenadoce from './clockFenadoce.jsx';

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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
