/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Sort } from './types/Sort';

const DEFAULT_ERROR_MESSAGE_TODOS = 'Failed to load todos, please try again later';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadins, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [querry, setQuerry] = useState('');
  const [sortMode, setSortMode] = useState(Sort.all);

  const getWantedTodos = useCallback((todo: Todo) => {
    return todo.title.includes(querry);
  }, []);

  function getVisibleTodos(type: Sort) {
    switch (type) {
      case Sort.all:
        return todos
          .filter(getWantedTodos);

      case Sort.active:
        return todos
          .filter(todo => !todo.completed)
          .filter(getWantedTodos);

      case Sort.completed:
        return todos
          .filter(todo => todo.completed)
          .filter(getWantedTodos);

      default:
        return todos;
    }
  }

  useEffect(() => {
    getTodos()
      .then(todosData => {
        setTodos(todosData);
        setIsLoading(false);
      })
      .catch(() => {
        setError(DEFAULT_ERROR_MESSAGE_TODOS);
      });
  }, []);

  const visibleTodos = getVisibleTodos(sortMode);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuerry={setQuerry}
                querry={querry}
                onSortMode={setSortMode}
              />
            </div>

            <div className="block">
              {isLoadins && !error && <Loader />}

              {!isLoadins && !error && (
                <TodoList list={visibleTodos} />
              )}

              {error && (
                <p className="error">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
