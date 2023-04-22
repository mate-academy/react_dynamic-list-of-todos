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

const getVisibleTodos = (filterCase: string, todos: Todo[], searchQuery: string) => {
  const searchedTodo = todos.filter(todo => todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));

  switch (filterCase) {
    case SortType.ACTIVE:
      return searchedTodo.filter(todo => !todo.completed);

    case SortType.COMPLETED:
      return searchedTodo.filter(todo => todo.completed);

    default:
      return searchedTodo;
  }
};

export const App: React.FC = () => {
  const [allTodos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [modalInfo, setModalInfo] = useState<Todo | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    getTodos().then(todos => {
      setTodos(todos);
      setIsInitialized(true);
    });
  }, []);

  const getModalInfo = (todo: Todo | null = null) => {
    setModalInfo(todo);
  };

  const filterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
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
              {!isInitialized ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onBtnClick={getModalInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalInfo && (
        <TodoModal
          modalInfo={modalInfo}
          onClick={getModalInfo}
        />
      )}
    </>
  );
};
