/* eslint-disable max-len */
import { ChangeEvent, FC, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useQuery } from '@tanstack/react-query';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: FC = () => {
  const { data: todos, isLoading, isError } = useQuery(['todos'], getTodos);
  const [selector, setSelector] = useState('allTodos');
  const [query, setQuery] = useState('');

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelector(event.target.value);
  };

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearQuery = () => {
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
                handleSelect={handleSelect}
                handleQuery={handleQuery}
                clearQuery={clearQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {isError && <div>Error</div>}
              {todos && !query && <TodoList todos={todos[selector as keyof typeof todos]} />}
              {todos
                && query
                && (
                  <TodoList
                    todos={todos[selector as keyof typeof todos].filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()))}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
