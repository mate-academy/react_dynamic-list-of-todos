/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { FilterParams, TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([] as Todo[]);

  const [filterParam, setFilterParam] = useState(FilterParams.All as string);
  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  // const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    getTodos().then(setTodos);
    setIsLoading(false);
  }, []);

  const handleChangeFilterParam = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterParam(event.target.value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const todosCopy = getTodos().then(todo => todo);


    switch (filterParam) {
      case FilterParams.Active:
        setTodos(todosCopy.filter(({ completed }) => !completed));
        break;

      case FilterParams.Completed:
        setTodos(todosCopy.filter(({ completed }) => completed));
        break;

      case FilterParams.All:
      default:
        getTodos().then(setTodos);
    }
  }, [filterParam]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterParam={filterParam}
                onFilterChange={handleChangeFilterParam}
                query={query}
                onSearch={handleSearch}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>
      {/* {isModalActive && (
        <TodoModal />
      )} */}
    </>
  );
};
