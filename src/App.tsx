/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');

  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .catch(() => setErrorMessage('Failed to load todos'))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && !todo.completed) ||
        (filterStatus === 'completed' && todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, filterStatus]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Todo App</h1>

        {isTodosLoading && <Loader />}

        {!isTodosLoading && !errorMessage && (
          <>
            <TodoFilter
              query={query}
              status={filterStatus}
              onQueryChange={setQuery}
              onStatusChange={setFilterStatus}
            />

            <TodoList
              todos={visibleTodos}
              onSelectTodo={setSelectedTodo}
              selectedTodo={selectedTodo}
            />
          </>
        )}

        {errorMessage && <p className="has-text-danger">{errorMessage}</p>}

        {selectedTodo && (
          <TodoModal
            todoTitle={selectedTodo.title}
            userId={selectedTodo.userId}
            todoId={selectedTodo.id}
            isOpen={!!selectedTodo}
            onClose={() => setSelectedTodo(null)}
          />
        )}
      </div>
    </div>
  );
};
