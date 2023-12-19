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

export const App: React.FC = () => {
  const [loading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            {/* {todos?.map(el => <p>{el.title}</p>)} */}

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loading
                && <Loader />}
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>
      {loading
        && <TodoModal />}
    </>
  );
};
