import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { SettingsProvider } from './contexts/SettingsContext';
import { ClientProvider } from './contexts/ClientContext';
import { Store } from './redux/Store';
import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <Provider store={Store}>
      <SettingsProvider>
        <MatxTheme>
          <ClientProvider>{content}</ClientProvider>
        </MatxTheme>
      </SettingsProvider>
    </Provider>
  );
};

export default App;
