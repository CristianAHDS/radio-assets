import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Geral from './geral.jsx';
import Esporte from './esporte.jsx';
import Fenadoce from './fenadoce.jsx';

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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
