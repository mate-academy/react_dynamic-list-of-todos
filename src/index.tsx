import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { TodosProvider } from './utils/TodosContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
