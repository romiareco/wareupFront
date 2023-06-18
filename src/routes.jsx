import AuthGuard from 'app/auth/AuthGuard';
import dashboardRoutes from './app/views/dashboard/DashboardRoutes';
import materialRoutes from './app/views/material-kit/MaterialRoutes';
import NotFound from './app/views/users/NotFound';
import UsersRoutes from './app/views/users/UsersRoutes';
import HomeRoutes from './app/views/home/HomeRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './app/components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...materialRoutes],
  },
  ...UsersRoutes,
  ...HomeRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
