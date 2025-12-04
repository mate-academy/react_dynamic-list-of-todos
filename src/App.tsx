/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
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

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoadingTodos(false));
  }, []);

  const filteredTodos = useMemo(() => {
    const q = query.trim().toLowerCase();

    return todos
      .filter(t => {
        if (status === 'active') {
          return !t.completed;
        }

        if (status === 'completed') {
          return t.completed;
        }

        return true;
      })
      .filter(t => (q ? t.title.toLowerCase().includes(q) : true));
  }, [todos, status, query]);

  const handleSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setLoadingUser(true);
    setUser(null);

    getUser(todo.userId)
      .then(u => setUser(u))
      .finally(() => setLoadingUser(false));
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setUser(null);
    setLoadingUser(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onStatusChange={value =>
                  setStatus(value as 'all' | 'active' | 'completed')
                }
                onQueryChange={v => setQuery(v)}
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loadingTodos ? <Loader /> : null}
              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodo?.id ?? null}
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        todo={selectedTodo}
        user={user}
        loadingUser={loadingUser}
        onClose={handleClose}
      />
    </>
  );
};
