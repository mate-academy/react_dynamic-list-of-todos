import { createRoot } from 'react-dom/client';

import { GlobalProvider } from './context/TodoContext';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
