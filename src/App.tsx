/* eslint-disable max-len */
// eslint-disable-next-line object-curly-newline
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

const getVisibleTodos = (filterCase: SortType, todos: Todo[], searchQuery: string) => {
  let searchedTodo;

  if (searchQuery.trim()) {
    searchedTodo = todos.filter(todo => todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  }

  switch (filterCase) {
    case SortType.ACTIVE:
      return searchedTodo === undefined
        ? todos.filter(todo => !todo.completed)
        : searchedTodo.filter(todo => !todo.completed);

    case SortType.COMPLETED:
      return searchedTodo === undefined
        ? todos.filter(todo => todo.completed)
        : searchedTodo.filter(todo => todo.completed);

    default:
      return searchedTodo === undefined ? todos : searchedTodo;
  }
};

export const App: React.FC = () => {
  const [allTodos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(SortType.ALL);
  const [query, setQuery] = useState('');
  const [modalInfo, setModalInfo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos().then(todos => {
      setTodos(todos);
      setIsLoading(true);
    });
    setIsLoading(false);
  }, []);

  const handleChangeModalInfo = (todo: Todo | null) => {
    setModalInfo(todo);
  };

  const filterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'all') {
      setFilter(SortType.ALL);
    }

    if (event.target.value === 'active') {
      setFilter(SortType.ACTIVE);
    }

    if (event.target.value === 'completed') {
      setFilter(SortType.COMPLETED);
    }
  };

  const searchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const searchReset = () => setQuery('');

  const visibleTodos = useMemo(() => (
    getVisibleTodos(filter, allTodos, query)
  ), [filter, allTodos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onFilterChange={filterChange}
                onSearchChange={searchChange}
                onReset={searchReset}
              />
            </div>

            <div className="block">
              {!isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onBtnClick={handleChangeModalInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalInfo && (
        <TodoModal
          modalInfo={modalInfo}
          onClick={handleChangeModalInfo}
        />
      )}
    </>
  );
};
