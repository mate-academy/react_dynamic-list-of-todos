/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inspectedTodo, setInspectedTodo] = useState<null | Todo>(null);

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
              <TodoList setIsLoading={setIsLoading} setInspectedTodo={setInspectedTodo} />
            </div>
          </div>
        </div>
      </div>

      {inspectedTodo && <TodoModal inspectedTodo={inspectedTodo} setInspectedTodo={setInspectedTodo} />}
      {/* ENABLE LATER */}
    </>
  );
};
