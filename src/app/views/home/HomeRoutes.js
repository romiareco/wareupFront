import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Home = Loadable(lazy(() => import('./Home')));

const homeRoutes = [
    { path: '/home', element: <Home /> }
  ];
  
  export default homeRoutes;