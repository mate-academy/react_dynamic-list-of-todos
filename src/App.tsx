/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { VisibleTodoModal } from './components/TodoModal';
import { ListLoader } from './components/Loader';
import { TodoProvider } from './TodoContext';

export const App: React.FC = () => {
  return (
    <>
      <TodoProvider>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList />
                <ListLoader />
              </div>
            </div>
          </div>
        </div>

        <VisibleTodoModal />
      </TodoProvider>
    </>
  );
};
