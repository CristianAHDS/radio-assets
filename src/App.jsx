import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Geral from './geral.jsx';
import Esporte from './esporte.jsx';
import Fenadoce from './fenadoce.jsx';
import Lower from './lower.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Geral />,
  },
  {
    path: '/esporte',
    element: <Esporte />,
  },
  {
    path: '/fenadoce',
    element: <Fenadoce />,
  },
  {
    path: '/lower',
    element: <Lower />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
