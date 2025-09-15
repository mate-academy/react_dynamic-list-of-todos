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
  const [todosLoading, setTodosLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [todosError, setTodosError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  const filteredTodos = todos.filter(todo => {
    // filter by status
    if (status === 'active' && todo.completed) {
      return false;
    }

    if (status === 'completed' && !todo.completed) {
      return false;
    }

    // filter by query (case insensitive in title)
    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    setTodosLoading(true);
    setTodosError(null);

    getTodos()
      .then(setTodos)
      .catch(() =>
        setTodosError('Failed to load todos. Please try again later.'),
      )
      .finally(() => setTodosLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);
      setUserLoading(false);
      setUserError(null);

      return;
    }

    setUserLoading(true);
    setUserError(null);

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(() => setUserError('Failed to load user data.'))
      .finally(() => setUserLoading(false));
  }, [selectedTodo]);

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
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                onQueryClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {todosError && (
                <p className="has-text-danger" data-cy="errorTodos">
                  {todosError}
                </p>
              )}

              {todosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={user}
        isLoading={userLoading}
        onClose={() => setSelectedTodo(null)}
        userError={userError}
      />
    </>
  );
};
