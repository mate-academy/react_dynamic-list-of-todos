import { createRoot } from 'react-dom/client';

import { App } from './App';
import { GlobalStateProvider } from './Store';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
