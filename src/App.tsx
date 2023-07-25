/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [selectAll, setSelectAll] = useState('active');
  const [choiceTodo, setChoiceTodo] = useState(false);
  const [todo, setTodo] = useState<Todo[]>([]);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      getTodos()
        .then(setTodo)
        .finally(() => setLoader(false));
    }, 1000);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectAll={selectAll}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              <TodoList
                todos={todo}
                setChoiceTodo={(newChoiceTodo) => setChoiceTodo(newChoiceTodo)}
              />
            </div>
          </div>
        </div>
      </div>

      {choiceTodo && <TodoModal />}

    </>
  );
};
