/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter, FILTER } from './types/Filter';
import { TodosContext } from './components/TodosContext';

const getFilteredTodos = (todos: Todo[], filter: Filter, query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  return todos
    .filter(todo => {
      if (filter === FILTER.ACTIVE) {
        return !todo.completed;
      }

      if (filter === FILTER.COMPLETED) {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => {
      if (!normalizedQuery) {
        return true;
      }

      return todo.title.toLowerCase().includes(normalizedQuery);
    });
};

export const App: React.FC = () => {
  const { todos, setTodos, filter, query } = React.useContext(TodosContext)!;
  const filteredTodos = getFilteredTodos(todos, filter, query);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    getTodos()
      .then(setTodos)
      .catch(() => setError('Failed to load todos.'))
      .finally(() => setLoading(false));
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
              {loading && <Loader />}

              {!loading && error && <p className="error">{error}</p>}

              {!loading && !error && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
