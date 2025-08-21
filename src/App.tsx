import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { ProgressStatusOption } from './types/ProgessStatusOptions';
import { Todo } from './types/Todo';
import { filterTodos } from './services/filterTodos';
import { ErrorBlock } from './components/ErrorBlock';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterValue, setFilterValue] = useState<ProgressStatusOption>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [error, setError] = useState('');
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setError('Failed to get data from server.'))
      .finally(() => setLoading(false));
  }, [updatedAt]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                filterValue={filterValue}
                onFilterValueChange={setFilterValue}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && !error && (
                <TodoList
                  todos={filterTodos(todos, query, filterValue)}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}

              {!loading && error && (
                <ErrorBlock
                  error={error}
                  setError={setError}
                  updateTimestamp={setUpdatedAt}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
