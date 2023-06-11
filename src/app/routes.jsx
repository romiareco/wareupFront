import AuthGuard from 'app/auth/AuthGuard';
import dashboardRoutes from './views/dashboard/DashboardRoutes';
import materialRoutes from './views/material-kit/MaterialRoutes';
import NotFound from './views/clients/NotFound';
import ClientsRoutes from './views/clients/ClientsRoutes';
import HomeRoutes from './views/home/HomeRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...materialRoutes],
  },
  ...ClientsRoutes,
  ...HomeRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
