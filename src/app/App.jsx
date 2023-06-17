import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { SettingsProvider } from './contexts/SettingsContext';
import { UserProvider } from './contexts/UserContext';
import { Store } from './redux/Store';
import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <Provider store={Store}>
      <SettingsProvider>
        <MatxTheme>
          <UserProvider>{content}</UserProvider>
        </MatxTheme>
      </SettingsProvider>
    </Provider>
  );
};

export default App;
