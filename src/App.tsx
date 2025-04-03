/* eslint-disable max-len */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import * as api from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoContext } from './components/TodoContext/TodoContext';

export const App: React.FC = () => {
  const { filteredTodos, setFilteredTodos, setTodos } = useContext(TodoContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTodoList = useCallback(() => {
    setIsLoading(true);
    api
      .getTodos()
      .then(todos => {
        setTodos(todos);
        setFilteredTodos(todos);
      })
      .finally(() => setIsLoading(false));
  }, [setTodos, setFilteredTodos]);

  useEffect(() => {
    handleGetTodoList();
  }, [handleGetTodoList]);

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
              {isLoading && <Loader />}
              {!isLoading && !!filteredTodos && (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
