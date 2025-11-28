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
  const [user, setUser] = useState<User | null>(null);

  const [loadingTodos, setLoadingTodos] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);

  type FilterStatus = 'all' | 'completed' | 'active';
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [query, setQuery] = useState<string>('');

  const handleChangeFilter = (status: 'all' | 'completed' | 'active') => {
    setFilterStatus(status);
  };

  const handleChangeQuery = (value: string) => {
    setQuery(value);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .catch(err => setError(err.message))
      .finally(() => setLoadingTodos(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return todos.filter(todo => {
      if (filterStatus === 'completed' && !todo.completed) {
        return false;
      }

      if (filterStatus === 'active' && todo.completed) {
        return false;
      }

      if (normalized && !todo.title.toLowerCase().includes(normalized)) {
        return false;
      }

      return true;
    });
  }, [todos, filterStatus, query]);

  const handleShow = (todo: Todo): void => {
    setSelectedTodo(todo);
    setLoadingUser(true);

    getUser(todo.userId)
      .then(u => setUser(u))
      .catch(err => setError(err.message))
      .finally(() => setLoadingUser(false));
  };

  const handleClose = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={filterStatus}
                query={query}
                onChangeFilter={handleChangeFilter}
                onChangeQuery={handleChangeQuery}
                onClearQuery={handleClearQuery}
              />
            </div>

            {error && <p className="has-text-danger">{error}</p>}

            <div className="block">
              {loadingTodos && <Loader />}
              <TodoList
                todos={visibleTodos}
                onShow={handleShow}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loading={loadingUser}
          onClose={handleClose}
        />
      )}
    </>
  );
};
