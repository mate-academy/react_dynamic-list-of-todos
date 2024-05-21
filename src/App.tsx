/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { CurrentTodo } from './contexts/CurrentTodoProvider';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(true);
  const { todo } = useContext(CurrentTodo);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .finally(() => {
        setLoader(false);
      });
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
              {loader ? <Loader /> : <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal />}
    </>
  );
};
