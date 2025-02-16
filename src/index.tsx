import { createRoot } from 'react-dom/client';

import { App } from './App';
import { GlobalStateProvider } from './components/Context/GlobalStateProvider';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
