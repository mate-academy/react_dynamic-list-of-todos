import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' ? !todo.completed : todo.completed);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        todo.title.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [todos, status, query]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setUser(null);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsUserLoading(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
    setIsUserLoading(false);
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
                onStatusChange={event =>
                  setStatus(event.target.value as StatusFilter)
                }
                onQueryChange={event => setQuery(event.target.value)}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div
              className={classNames('block', {
                'is-loading': isLoading,
              })}
            >
              {isLoading ? <Loader /> : null}
              {!isLoading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id ?? null}
                  onSelect={handleSelectTodo}
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
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
