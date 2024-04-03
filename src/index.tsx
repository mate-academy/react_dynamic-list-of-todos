import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

import { TodosProvider } from './store/Store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosProvider>
    <App />
  </TodosProvider>,
);
