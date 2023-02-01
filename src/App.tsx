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
  const [todo, setTodo] = useState<Todo>();
  // const [todos] = useState<Todo[]>();
  const [appTodo, setAppTodo] = useState<Todo[]>([]);
  const [check, setCheck] = useState(false);
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 500);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={setAppTodo} />
            </div>

            <div className="block">
              {loader
                ? <Loader />
                : <TodoList appTodo={appTodo} setTodo={setTodo} onCheck={setCheck} />}
            </div>
          </div>
        </div>
      </div>

      {(todo && check) && (<TodoModal todo={todo} onCheck={setCheck} />)}
    </>
  );
};
