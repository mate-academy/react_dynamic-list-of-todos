/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodoId === null) {
      setSelectedUser(null);
      return;
    }

    const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

    if (!selectedTodo) {
      return;
    }

    setIsUserLoading(true);
    setSelectedUser(null);

    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .catch(() => setErrorMessage('Failed to load user'))
      .finally(() => setIsUserLoading(false));
  }, [selectedTodoId, todos]);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase().trim());

    if (status === 'active') {
      return matchesQuery && !todo.completed;
    }

    if (status === 'completed') {
      return matchesQuery && todo.completed;
    }

    return matchesQuery;
  });

  const handleClearQuery = () => {
    setQuery('');
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
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {errorMessage && (
                <div className="notification is-danger">
                  {errorMessage}
                </div>
              )}

              {!isLoading && !errorMessage && (
                <TodoList
                  todos={visibleTodos}
                  onSelect={setSelectedTodoId}
                  selectedTodoId={selectedTodoId}
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
          isUserLoading={isUserLoading}
          onClose={() => setSelectedTodoId(null)}
        />
      )}
    </>
  );
};