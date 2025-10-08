import React, { useState, useEffect, useMemo } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  // Filter state
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    // toggle selection: if same -> close
    if (selectedTodo?.id === todo.id) {
      handleCloseModal();

      return;
    }

    setSelectedTodo(todo);
    setUser(null);
    setLoadingUser(true);

    // request user -> ensures fetch to /users/:id happens (cypress waits for it)
    getUser(todo.userId)
      .then(fetchedUser => {
        setUser(fetchedUser);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
    setLoadingUser(false);
  };

  // Filtering logic (search + status)
  const filteredTodos = useMemo(() => {
    const q = query.trim().toLowerCase();

    return todos
      .filter(todo => {
        // status filter
        // eslint-disable-next-line curly
        if (status === 'active') return !todo.completed;
        // eslint-disable-next-line curly
        if (status === 'completed') return todo.completed;
        // eslint-disable-next-line padding-line-between-statements
        return true;
      })
      .filter(todo => {
        // search query filter
        // eslint-disable-next-line curly
        if (!q) return true;

        return todo.title.toLowerCase().includes(q);
      });
  }, [todos, query, status]);

  return (
    <div className="section">
      <h1 className="title has-text-centered">Todos App</h1>

      <TodoFilter
        filterStatus={status}
        onFilterStatusChange={(s) => setStatus(s)}
        query={query}
        onQueryChange={setQuery}
      />

      {loadingTodos ? (
        <Loader />
      ) : (
        <TodoList
          todos={filteredTodos}
          onSelect={handleSelectTodo}
          selectedTodoId={selectedTodo?.id ?? null}
        />
      )}

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loadingUser={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
