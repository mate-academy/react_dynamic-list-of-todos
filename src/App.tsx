/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './services/todos';
import { Status } from './types/Status';
import { getPreparedTodos } from './utils/getPreparedTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(Status.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const vsibleTodos = getPreparedTodos(query, filter, todos);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              filter={filter}
              setFilter={setFilter}
              query={query}
              setQuery={setQuery}
            />
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="block">
              <TodoList todos={vsibleTodos} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
