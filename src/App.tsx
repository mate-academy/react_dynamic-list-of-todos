/* eslint-disable max-len */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoContext } from './Store';
import { getDisplayedTodos } from './utis';

export const App: React.FC = () => {
  const { todos, setTodos, appliedQuery, filter, selectedTodo } =
    useContext(TodoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .finally(() => setLoading(false))
      .then(setTodos);
  }, [setTodos]);

  const displayedTodos = useMemo(() => {
    return getDisplayedTodos(todos, filter, appliedQuery);
  }, [todos, filter, appliedQuery]);

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
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={displayedTodos} selectedTodo={selectedTodo} />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
