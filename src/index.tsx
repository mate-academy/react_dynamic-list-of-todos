import { createRoot } from 'react-dom/client';

import { App } from './App';
import { GlobalProvider } from './context/TodoContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
