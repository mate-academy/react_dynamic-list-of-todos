/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { UserContext } from './components/UserContext';

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
    selectedTodoId,
  } = useContext(UserContext);

  const getTodosFromServer = async () => {
    const newTodos = await getTodos();

    setTodos(newTodos);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

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
              {todos.length === 0
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && <TodoModal />}
    </>
  );
};
