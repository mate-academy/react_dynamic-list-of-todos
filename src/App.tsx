/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { AppProvider } from './StoreApp';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <TodoApp />
    </AppProvider>
  );
};
