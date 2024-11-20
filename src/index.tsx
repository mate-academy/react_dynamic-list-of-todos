import { createRoot } from 'react-dom/client';

import { App } from './App';
import { TodoContextProvider } from './components/context/TodoContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,
);
