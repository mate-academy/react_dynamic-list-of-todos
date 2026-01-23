import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos. Please try again later.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUserLoading(true);
    setErrorMessage(null);

    getUser(todo.userId)
      .then(setSelectedUser)
      .catch(() => {
        setErrorMessage('Failed to fetch user details.');
        setSelectedTodo(null);
      })
      .finally(() => setIsUserLoading(false));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase().trim());

      return matchesStatus && matchesQuery;
    });
  }, [todos, status, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            {errorMessage && (
              <div className="notification is-danger is-light">
                <button
                  className="delete"
                  onClick={() => setErrorMessage(null)}
                  aria-label="close"
                />
                {errorMessage}
              </div>
            )}

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShow={handleSelectTodo}
                  activeId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoading}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
