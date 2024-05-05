import { createRoot } from 'react-dom/client';

import { App } from './App';
import { GlobalTodoProvider } from './context/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalTodoProvider>
    <App />
  </GlobalTodoProvider>
);
