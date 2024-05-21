/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { CurrentTodo } from './contexts/CurrentTodoProvider';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const { todo } = useContext(CurrentTodo);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);
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

            <div className="block">{loader ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {todo && <TodoModal />}
    </>
  );
};
