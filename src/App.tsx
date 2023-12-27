/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchTodos = () => {
      getTodos()
        .then((todosData) => {
          setTodos(todosData);
          setFilteredTodos(todosData);
        })
        .finally(() => setIsLoading(false));
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilteredTodos={setFilteredTodos} todos={todos} />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
