/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selected, setSelected] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  const normalizedQuery = query.toLowerCase();

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    const matchingStatus =
      status === 'all' ||
      (status === 'completed' ? todo.completed : !todo.completed);

    return matchesQuery && matchingStatus;
  });

  function handleSelect(todo: Todo | null) {
    setSelected(todo);
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChange={setQuery}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {loading && todos.length === 0 && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleSelect}
                  selectedTodo={selected}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <TodoModal todo={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};
