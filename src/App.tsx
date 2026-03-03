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
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTodo = () => {
    getTodos()
      .then(tods => {
        setTodosFromServer(tods);

        return tods;
      })
      .then(tods => setTodos(tods))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadTodo();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todosFromServer} onFilter={setTodos} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
