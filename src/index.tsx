import { createRoot } from 'react-dom/client';

import { App } from './App';
import { TodoContextProvider } from './contexts/TodoContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,
);
