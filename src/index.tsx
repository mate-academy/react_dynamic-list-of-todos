import { createRoot } from 'react-dom/client';

import { App } from './App';
import { TodosProvider } from './store';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
