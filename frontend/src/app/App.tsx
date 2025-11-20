import { AppProviders } from './providers';
import { AppRouter } from './router';
import '@/assets/styles/globals.css';

/**
 * @component App
 * @summary Root application component
 */
function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
