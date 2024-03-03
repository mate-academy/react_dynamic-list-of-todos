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
  const [data, setData] = useState<Todo[] | []>([]);
  const [activeTodo, setActiveTodo] = useState<undefined | Todo>(undefined);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setData={setData} />
            </div>

            <div className="block">
              {data.length > 0 ? (
                <TodoList
                  data={data}
                  setActiveTodo={setActiveTodo}
                  activeTodo={activeTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal activeTodo={activeTodo} setActiveTodo={setActiveTodo} />
      )}
    </>
  );
};
