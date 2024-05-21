import { createRoot } from 'react-dom/client';

import { App } from './App';
import { CurrentTodoProvider } from './contexts/CurrentTodoProvider';
import { SearchProvider } from './contexts/SearchProvider';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <SearchProvider>
    <CurrentTodoProvider>
      <App />
    </CurrentTodoProvider>
  </SearchProvider>,
);
