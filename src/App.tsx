/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

import { getTodos } from './api'; // , getUser

export const App: React.FC = () => {
  const [todos, setToods] = useState<Todo[]>([]);
  const [isLoading] = useState(false); // setIsLoading

  // console.log('todos:', todos);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setToods(fetchedTodos);
      } catch (error) {
        // console.error(error);

        throw new Error(`We have a problem when we have loaded data - ${error}`);
      }
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
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>

      {isLoading && <TodoModal />}
    </>
  );
};
