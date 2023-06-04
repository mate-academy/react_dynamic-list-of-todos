/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inspectedTodoId, setInspectedTodoId] = useState(null);

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
              <TodoList setIsLoading={setIsLoading} setInspectedTodoId={setInspectedTodoId} />
            </div>
          </div>
        </div>
      </div>

      {inspectedTodoId && <TodoModal />}
      {/* ENABLE LATER */}
    </>
  );
};
