import React, { useState, useEffect, useMemo, useRef } from 'react';
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

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  // ref для унікального ID запиту користувача
  const requestIdRef = useRef(0);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      handleCloseModal();
      return;
    }

    setSelectedTodo(todo);
    setUser(null);
    setLoadingUser(true);

    const currentRequestId = ++requestIdRef.current;

    getUser(todo.userId)
      .then(fetchedUser => {
        // перевіряємо, чи запит ще актуальний
        if (requestIdRef.current === currentRequestId) {
          setUser(fetchedUser);
        }
      })
      .catch(() => {
        if (requestIdRef.current === currentRequestId) {
          setUser(null);
        }
      })
      .finally(() => {
        if (requestIdRef.current === currentRequestId) {
          setLoadingUser(false);
        }
      });
  };

  const handleCloseModal = () => {
    // скидаємо стан і позначаємо старі запити як неактуальні
    requestIdRef.current += 1;
    setSelectedTodo(null);
    setUser(null);
    setLoadingUser(false);
  };

  const filteredTodos = useMemo(() => {
    const q = query.trim().toLowerCase();

    return todos
      .filter(todo => {
        if (status === 'active') return !todo.completed;
        if (status === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (!q) return true;
        return todo.title.toLowerCase().includes(q);
      });
  }, [todos, query, status]);

  return (
    <div className="section">
      <h1 className="title has-text-centered">Todos App</h1>

      <TodoFilter
        filterStatus={status}
        onFilterStatusChange={setStatus}
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
