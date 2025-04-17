/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { StateProvider } from './context/stateContext';
import { TodoModal } from './components/TodoModal';
import { TodoProvider } from './context/todoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <StateProvider>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList />
              </div>
            </div>
          </div>
        </div>

        <TodoModal />
      </StateProvider>
    </TodoProvider>
  );
};
