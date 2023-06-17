import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const SignUp = Loadable(lazy(() => import('./SignUp')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const SignIn = Loadable(lazy(() => import('./SignIn')));

const usersRoutes = [
  { path: '/users/signup', element: <SignUp /> },
  { path: '/users/signin', element: <SignIn /> },
  { path: '/users/forgot-password', element: <ForgotPassword /> },
  { path: '/users/404', element: <NotFound /> }
];

export default usersRoutes;
