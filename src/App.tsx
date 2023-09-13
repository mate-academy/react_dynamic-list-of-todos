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

  const [filterParam, setFilterParam] = useState({
    selectFilter: 'all',
    query: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  // const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    getTodos().then(setTodos);
    setIsLoading(false);
  }, []);

  const handleChangeFilterParam = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterParam((prev) => ({ ...prev, selectFilter: event.target.value }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParam((prev) => ({ ...prev, query: event.target.value }));
  };

  useEffect(() => {
    if (filterParam.selectFilter === FilterParams.Active && !filterParam.query) {
      getTodos().then(todo => todo.filter((todoTask) => !todoTask.completed)).then(setTodos);
    }

    if (filterParam.selectFilter === FilterParams.Completed && !filterParam.query) {
      getTodos().then(todo => todo.filter((todoTask) => todoTask.completed)).then(setTodos);
    }

    if (filterParam.selectFilter === FilterParams.All && !filterParam.query) {
      getTodos().then(setTodos);
    }

    if (filterParam.query) {
      getTodos()
        .then(todo => todo.filter(({ title }) => title.includes(filterParam.query.toLowerCase())))
        .then(setTodos);
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
