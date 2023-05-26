/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [data, setData] = useState<Todo[]>([]);

  async function handleGetTodo(f: () => Promise<Todo[]>) {
    const result = await f();

    setData(result);
  }

  useEffect(() => {
    handleGetTodo(getTodos);
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
              {/* <Loader /> */}
              <TodoList todos={data} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
