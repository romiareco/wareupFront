import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const SignUp = Loadable(lazy(() => import('./SignUp')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const SignIn = Loadable(lazy(() => import('./SignIn')));

const clientsRoutes = [
  { path: '/clients/signup', element: <SignUp /> },
  { path: '/clients/signin', element: <SignIn /> },
  { path: '/clients/forgot-password', element: <ForgotPassword /> },
  { path: '/clients/404', element: <NotFound /> }
];

export default clientsRoutes;
