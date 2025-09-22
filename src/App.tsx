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
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [search, setSearch] = useState<string>('');

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setUser(null);
    setLoadingUser(true);

    getUser(todo.userId)
      .then(data => setUser(data))
      .finally(() => setLoadingUser(false));
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    setLoading(true);

    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as 'all' | 'active' | 'completed');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (status === 'active') {
          return !todo.completed;
        }

        if (status === 'completed') {
          return todo.completed;
        }

        return true; // 'all'
      })
      .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
  }, [todos, status, search]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={handleStatusChange}
                search={search}
                onSearchChange={handleSearchChange}
                onClear={handleClearSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={filteredTodos} onShowTodo={handleShowTodo} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          loading={loadingUser}
          onClose={handleClose}
          user={user}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
