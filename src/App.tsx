/* eslint-disable max-len */
import React, { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [isLoadingError, setIsLoadingError] = useState(false);
  const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos();

      setIsLoaded(true);
      setTodos(loadedTodos);
    } catch (error) {
      // setIsLoadingError(true)
    }
  };

  loadTodos();

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
              {isLoaded
                ? <TodoList todos={todos} />
                : <Loader />}
              {/* <Loader /> */}

            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
