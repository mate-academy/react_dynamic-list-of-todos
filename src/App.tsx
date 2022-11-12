/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const visibleTodos = [...todos];

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        try {
          setIsLoading(false);
          setTodos(todosFromServer);
        } catch (error: any) {
          Error(error);
        }
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {isLoading
                ? <Loader />
                : <TodoFilter todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
