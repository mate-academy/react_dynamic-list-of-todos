/* eslint-disable max-len */
import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { TodoContext, TodoProvider } from './components/TodoContext';
import { Loader } from './components/Loader';

export const AppContent: React.FC = () => {
  const { todos, selectedTodo, query } = useContext(TodoContext);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              { todos.length ? (<TodoList />
              ) : (
                !query && <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      { selectedTodo && (<TodoModal />)}
    </>
  );
};

export const App: React.FC = () => (
  <TodoProvider>
    <AppContent />
  </TodoProvider>
);
