/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodosContext } from './components/TodosContext/TodosContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const {
    showModal, currentUser, selectValue, searchValue,
  } = useContext(TodosContext);

  useEffect(() => {
    getTodos().then((todosFromServer) => {
      const t = todosFromServer.filter(todo => {
        switch (selectValue) {
          case 'completed':
            return todo.completed === true;
          case 'active':
            return todo.completed === false;
          default:
            return true;
        }
      });

      const tt = t.filter((todo) => todo.title.toLowerCase().includes(searchValue.toLowerCase().trim()));

      setTodos(tt);
    });
  }, [selectValue, searchValue]);

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
              {todos !== null ? <TodoList todos={todos} /> : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {showModal && <TodoModal currentUser={currentUser} todos={todos} />}
    </>
  );
};
