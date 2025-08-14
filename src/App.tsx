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
import { FILTER_STATUSES } from './types/filterStatus';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>(FILTER_STATUSES.ALL);
  const [query, setQuery] = useState('');

  const filteredTodos = todos.filter(todo => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchesStatus =
      statusFilter === FILTER_STATUSES.ALL
        ? true
        : (statusFilter === FILTER_STATUSES.COMPLETED) === todo.completed;

    const matchesQuery =
      normalizedQuery === ''
        ? true
        : todo.title.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });

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
                value={statusFilter}
                onSelect={setStatusFilter}
                search={query}
                onSearch={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo &&
        (loading ? (
          <Loader />
        ) : (
          <TodoModal
            todo={selectedTodo}
            userId={selectedTodo.userId}
            onClose={setSelectedTodo}
          />
        ))}
    </>
  );
};
