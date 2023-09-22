/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { FilterOptions, FilterType } from './types/FilterType';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { ErrorText } from './components/ErrorText';
import { getTodos } from './api';
import { getFilteredTodos } from './helpers/getFilteredTodos';

const initialFilterValue: FilterType = {
  filterByTitle: '',
  filterByStatus: FilterOptions.All,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(initialFilterValue);
  const [error, setError] = useState(false);

  const filteredTodos = getFilteredTodos(todos, filter);

  const handleModalToggle = () => {
    if (activeTodo) {
      setActiveTodo(null);
    }

    setActiveTodo(activeTodo);
  };

  const handleActiveTodoSet = (todo: Todo | null) => {
    setActiveTodo(todo);
  };

  const handleFilterSet
    = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;

      setFilter(prevFilter => ({
        ...prevFilter,
        [name]: value.trimStart(),
      }));
    };

  const handleInputClear
    = () => {
      setFilter(prevFilter => ({
        ...prevFilter,
        filterByTitle: '',
      }));
    };

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getTodos()
      .then(setTodos)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return (
      <ErrorText />
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onFilterSet={handleFilterSet}
                onInputClear={handleInputClear}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  activeTodo={activeTodo}
                  onModalToggle={handleModalToggle}
                  onActiveTodoSet={handleActiveTodoSet}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          onActiveTodoSet={handleActiveTodoSet}
        />
      )}
    </>
  );
};
