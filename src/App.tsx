/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const [query, setQuery] = useState('');
  const [statusF, setStatusF] = useState<'all' | 'active' | 'completed'>('all');

  const [selectTodos, setSelectTodos] = useState<Todo | null>(null);
  const [selectUser, setSelectUser] = useState<User | null>(null);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setVisibleTodos(data);
      })
      .finally(() => setLoadingTodos(false));
  }, []);

  useEffect(() => {
    let filtered = [...todos];

    if (statusF === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (statusF === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setVisibleTodos(filtered);
  }, [query, statusF, todos]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleStatusChange = (newStatus: typeof statusF) => {
    setStatusF(newStatus);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleTodosSelect = (todo: Todo) => {
    setSelectTodos(todo);
    setLoadingUser(true);
    getUser(todo.userId)
      .then(setSelectUser)
      .finally(() => setLoadingUser(false));
  };

  const handleCloseModal = () => {
    setSelectTodos(null);
    setSelectUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={statusF}
                onQueryChange={handleQueryChange}
                onQueryClear={handleClearQuery}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}

              {!loadingTodos && (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleTodosSelect}
                  selectTodoId={selectTodos?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodos && (
        <TodoModal
          todo={selectTodos}
          user={selectUser}
          isUserLoading={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
