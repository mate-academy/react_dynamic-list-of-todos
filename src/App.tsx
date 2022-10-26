/* eslint-disable max-len */
import { ChangeEvent, FC, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useQuery } from '@tanstack/react-query';
import { TodoList } from './components/TodoList';
import { TodoFilter, TodoSelect } from './components/TodoFilter';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: FC = () => {
  const { data: todos, isLoading, isError } = useQuery(['todos'], getTodos);
  const [selector, setSelector] = useState<TodoSelect>(TodoSelect.allTodos);
  const [query, setQuery] = useState('');

  const filteredTodos = (someQuery: string, someSelector: TodoSelect) => {
    if (todos) {
      if (!someQuery) {
        return todos[someSelector as keyof typeof todos];
      }

      return todos[someSelector as keyof typeof todos]
        .filter((todo) => todo.title.toLowerCase().includes(someQuery));
    }

    return [];
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelector(event.target.value as TodoSelect);
  };

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase());
  };

  const clearQuery = () => {
    setQuery('');
  };

  const todosToRender = filteredTodos(query, selector);

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
              {todos && <TodoList todos={todosToRender} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
