/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

// console.log(getTodos().then(data => console.log(data)));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isDataReady = !isLoading;

  useEffect(
    () => {
      setIsLoading(true);

      Promise.all([getTodos()])
        .then((dataFromServer) => {
          const [todosFS] = dataFromServer;

          setTodos(todosFS);
        })
        .finally(() => setIsLoading(false));
    },
    [],
  );

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
              {isLoading && (
                <Loader />
              )}

              {isDataReady && (
                <TodoList
                  todos={todos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
