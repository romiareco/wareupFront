import { MatxSuspense } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { UserLayout } from './UserLayout';

export function MatxLayout(props) {
  const { settings } = useSettings();
  const Layout = UserLayout[settings.activeLayout];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
};