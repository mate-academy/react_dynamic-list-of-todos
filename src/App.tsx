/* eslint-disable max-len */
import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { TodoContext, TodoProvider } from './components/TodoContext/TodoContext';

export const App: React.FC = () => {
  const {
    selectedUser,
  } = useContext(TodoContext);

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
              </div>
            </div>
          </div>
        </div>

        {selectedUser
      && (
        <TodoModal />
      )}
      </TodoProvider>
    </>
  );
};
