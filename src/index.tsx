import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import {
  QueryProvider,
  UserIdProvider,
  ActiveTodoProvider,
} from './util/Store';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <QueryProvider>
    <UserIdProvider>
      <ActiveTodoProvider>
        <App />
      </ActiveTodoProvider>
    </UserIdProvider>
  </QueryProvider>,
);
