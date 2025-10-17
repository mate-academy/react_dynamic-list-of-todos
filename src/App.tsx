import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  const selectedTodo = useMemo(
    () =>
      selectedId !== null
        ? (todos.find(t => t.id === selectedId) ?? null)
        : null,
    [todos, selectedId],
  );

  useEffect(() => {
    if (selectedId !== null) {
      const todo = todos.find(t => t.id === selectedId);
      if (todo) {
        setLoadingUser(true);
        getUser(todo.userId)
          .then(setUser)
          .finally(() => setLoadingUser(false));
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [selectedId, todos]);

  const filteredTodos = useMemo(() => {
    const q = query.toLowerCase();
    return todos.filter(todo => {
      if (status === 'completed' && !todo.completed) return false;
      if (status === 'active' && todo.completed) return false;
      if (q && !todo.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [todos, status, query]);

  const handleSelect = useCallback((id: number) => {
    setSelectedId(prev => (prev === id ? null : id));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loading={loadingUser}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
};
