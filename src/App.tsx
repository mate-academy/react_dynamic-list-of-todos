/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setError('Failed to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

  const getUser = async (userId: number): Promise<User> => {
    const response = await fetch(`/api/users/${userId}.json`);

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  };

  const handleSelectTodo = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
      setIsUserLoading(true);
      setUser(null);

      getUser(todo.userId)
        .then(setUser)
        .catch(() => setError('Failed to load user'))
        .finally(() => setTimeout(() => setIsUserLoading(false), 2000));
    },
    [getUser, setSelectedTodo, setIsUserLoading, setUser, setError],
  );

  const filterTodos = todos.filter(todo => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={filter}
                onChangeFilter={setFilter}
                query={searchQuery}
                onQueryChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {error && <p className="has-text-danger">{error}</p>}
              {!isLoading && !error && (
                <TodoList
                  todos={filterTodos}
                  onSelectedTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
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
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
