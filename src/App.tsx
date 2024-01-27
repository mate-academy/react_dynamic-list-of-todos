/* eslint-disable max-len */
import React, {
  useContext, useEffect, useMemo, useState,
}
  from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';
import { TodoContext } from './contexts/TodoContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { selectedTodo } = useContext(TodoContext);

  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);

    getTodos().then(setTodos);
  }, []);

  const filteredByQuery = useMemo(
    () => todos.filter((todo) => {
      const normalizedQuery = query.trim();

      return todo.title.toLowerCase().includes(normalizedQuery.toLowerCase());
    }),
    [query, todos],
  );

  const visibleTodos = useMemo(
    () => filteredByQuery.filter((todo) => {
      switch (status) {
        case Status.all:
          return todo;
        case Status.active:
          return !todo.completed;
        case Status.completed:
          return todo.completed;
        default:
          return todo;
      }
    }),
    [status, filteredByQuery],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo.hasChosen && (
        <TodoModal />
      )}
    </>
  );
};
