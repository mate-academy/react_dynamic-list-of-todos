/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { getFilteredTodos } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filterParam, setFilterParam] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  const visibleGoods = useMemo(() => {
    return getFilteredTodos(todos, filterParam, query);
  }, [query, filterParam, todos]);

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
                filterParam={filterParam}
                onFilterChange={setFilterParam}
              />
            </div>

            <div className="block">
              {isLoading && !selectedTodo && <Loader />}
              {!!todos.length && (
                <TodoList
                  todos={visibleGoods}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          user={user}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
