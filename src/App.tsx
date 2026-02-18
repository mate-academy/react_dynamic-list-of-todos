import React, { useEffect, useMemo, useState } from 'react';
import { getTodos, getUser } from './api/api';
import { TodosList } from './components/TodosList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import type { Todo, User } from './types';

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoadingTodos(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
      })
      .finally(() => setLoadingTodos(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos
      .filter(todo => {
        if (status === 'completed') return todo.completed;
        if (status === 'active') return !todo.completed;
        return true;
      })
      .filter(todo => {
        if (!normalizedQuery) return true;
        return todo.title.toLowerCase().includes(normalizedQuery);
      });
  }, [todos, status, query]);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setUser(null);
    setLoadingUser(true);

    getUser(todo.userId)
      .then(setUser)
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoadingUser(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
    setLoadingUser(false);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  return (
    <div className="App">
      <h1 className="App__title">TODO App</h1>

      <TodoFilter
        status={status}
        query={query}
        onStatusChange={setStatus}
        onQueryChange={setQuery}
        onQueryClear={handleClearQuery}
      />

      {loadingTodos ? (
        <Loader />
      ) : (
        <TodosList todos={visibleTodos} onShowTodo={handleShowTodo} />
      )}

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoadingUser={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
