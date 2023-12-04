/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoContext } from './context';
import * as API from './api';

export const App: React.FC = () => {
  const { setTodos } = useContext(TodoContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getTodos()
      .then(todoItem => {
        setTodos(todoItem);
        setIsLoading(false);
      });
  }, [setTodos]);

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
              {
                isLoading
                  ? <Loader />
                  : <TodoList />
              }
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
