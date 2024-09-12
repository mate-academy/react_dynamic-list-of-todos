/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { DispatchContext, StateContext } from './Store';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const [isLoaded, setIsLoaded] = useState(true);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (isLoaded) {
      getTodos()
        .then(items => {
          return dispatch({
            type: 'loadTodos',
            todos: items,
          });
        })
        .finally(() => {
          setIsLoaded(false);
        });
    }
  }, [dispatch, isLoaded]);

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
              {isLoaded && <Loader />}
              {!isLoaded && <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
