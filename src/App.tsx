/* eslint-disable max-len */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { SelectOptions, StateContext } from './context/TodoContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const { openModal, filter, query } = useContext(StateContext);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const preparedTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === SelectOptions.Active) {
        return (
          !todo.completed &&
          todo.title.toLowerCase().includes(query.toLowerCase())
        );
      } else if (filter === SelectOptions.Completed) {
        return (
          todo.completed &&
          todo.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [todos, filter, query]);

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
              {loading ? <Loader /> : <TodoList todos={preparedTodos} />}
            </div>
          </div>
        </div>
      </div>

      {openModal && <TodoModal />}
    </>
  );
};
