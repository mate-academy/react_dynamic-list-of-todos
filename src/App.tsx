/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './utils/getTodos';
import { Todo } from './types/Todo';

import { getPreparedTodos } from './utils/getPrepearedTodos';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);
  const [errorMessage, setErrorMessage] = useState('');
  const visibleTodos = useMemo(() => {
    return getPreparedTodos(todos, filterType, query);
  }, [todos, filterType, query]);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setIsTodosLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSetQuery={setQuery}
                filterType={filterType}
                onSetFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}
              {!isTodosLoading && !!todos.length && (
                <TodoList
                  todos={visibleTodos}
                  onSetCurrentTodo={setCurrentTodo}
                  currentTodo={currentTodo}
                />
              )}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
          onSetCurrentTodo={setCurrentTodo}
        />
      )}
    </>
  );
};
