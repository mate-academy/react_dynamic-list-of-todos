import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import {
  QueryProvider,
  ActiveModalProvider,
  ActiveTodoProvider,
} from './util/Store';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <QueryProvider>
    <ActiveModalProvider>
      <ActiveTodoProvider>
        <App />
      </ActiveTodoProvider>
    </ActiveModalProvider>
  </QueryProvider>,
);
