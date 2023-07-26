import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './context/TodoContext';
import { UserProvider } from './context/UserContext';

export const App: React.FC = () => {
  return (
    <UserProvider>
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </UserProvider>
  );
};
