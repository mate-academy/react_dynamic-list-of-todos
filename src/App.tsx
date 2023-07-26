/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getPreparedTodos } from './services/GetTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => getPreparedTodos(
    todos,
    filter,
    debouncedQuery,
  ), [todos, filter, debouncedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setQuery={setQuery}
                setDebouncedQuery={setDebouncedQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              )
                : (
                  <TodoList
                    todos={filteredTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
