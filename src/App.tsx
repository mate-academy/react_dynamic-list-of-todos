/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todosFromAPI, setTodosFromAPI] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodosFromAPI)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todosFromAPI.filter(todo => {
      const matchesStatus =
        filterStatus === FilterStatus.All ||
        (filterStatus === FilterStatus.Active && !todo.completed) ||
        (filterStatus === FilterStatus.Completed && todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [todosFromAPI, filterStatus, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filterStatus}
                setStatus={setFilterStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelect={setSelectedId}
                selectedId={selectedId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedId && (
        <TodoModal
          id={selectedId}
          todos={filteredTodos}
          onClose={setSelectedId}
        />
      )}
    </>
  );
};
