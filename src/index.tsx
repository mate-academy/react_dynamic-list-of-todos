import { createRoot } from 'react-dom/client';

import { App } from './App';
import { GlobalStateProvider } from './types/Store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
