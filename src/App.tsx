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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  const filteredByStatus = useMemo(() => {
    return todos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, status]);

  const filteredByQuery = useMemo(() => {
    return filteredByStatus.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [filteredByStatus, query]);

  useEffect(() => {
    setErrorMessage('');
    if (!selectedTodos) {
      return;
    }

    let isCancelled = false;

    getUser(selectedTodos.userId)
      .then(loadDataUser => {
        if (!isCancelled) {
          setSelectedUser(loadDataUser);
        }
      })
      .catch(() => {
        return setErrorMessage('User not found');
      })
      .finally(() => {
        if (!isCancelled) {
          setIsUserLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedTodos]);

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelect = (todo: Todo) => {
    setSelectedTodos(todo);
    setSelectedUser(null);
    setIsUserLoading(true);
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
                onStatusChange={setStatus}
                query={query}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {errorMessage && (
                <p className="has-text-danger">{errorMessage}</p>
              )}
              {!isLoading && !errorMessage && (
                <TodoList
                  todos={filteredByQuery}
                  selectedTodos={selectedTodos}
                  onSelected={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodos && (
        <TodoModal
          selectedTodos={selectedTodos}
          user={selectedUser}
          isUserLoading={isUserLoading}
          onClose={() => setSelectedTodos(null)}
        />
      )}
    </>
  );
};
