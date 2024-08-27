/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { SortName } from './types/sortByFilter';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(true);
  const [sortBy, setSortBy] = useState(SortName.All);
  const [search, setSearch] = useState('');

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSort =
      sortBy === SortName.All ||
      (sortBy === SortName.Active && !todo.completed) ||
      (sortBy === SortName.Completed && todo.completed);

    return matchesSearch && matchesSort;
  });

  useEffect(() => {
    getTodos()
      .then(elements => {
        setTodos(elements);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              todos={todos}
              onSortList={setSortBy}
              handleSearchInput={setSearch}
              search={search}
              sortBy={sortBy}
            />
          </div>

          <div className="block">
            {loader ? <Loader /> : <TodoList todos={filteredTodos} />}
          </div>
        </div>
      </div>
    </div>
  );
};
