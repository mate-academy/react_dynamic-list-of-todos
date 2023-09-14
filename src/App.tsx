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
import { getTodos } from './api';
import { getFilteredTodos } from './helpers/getFilteredTodos';

const initialFilterValue: FilterType = {
  filterByTitle: '',
  filterByStatus: FilterOptions.All,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(initialFilterValue);

  const filteredTodos = getFilteredTodos(todos, filter);

  const handleToggleModal = () => {
    setIsVisibleModal(prev => !prev);
  };

  const handleSetActiveTodo = (todo: Todo | null) => {
    setActiveTodo(todo);
  };

  const handleSetFilter
  = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value.trimStart(),
    }));
  };

  const handleClearInput
  = () => {
    setFilter(prevFilter => ({
      ...prevFilter,
      filterByTitle: '',
    }));
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                handleSetFilter={handleSetFilter}
                handleClearInput={handleClearInput}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  activeTodo={activeTodo}
                  handleToggleModal={handleToggleModal}
                  handleSetActiveTodo={handleSetActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isVisibleModal && (
        <TodoModal
          activeTodo={activeTodo}
          handleToggleModal={handleToggleModal}
          handleSetActiveTodo={handleSetActiveTodo}
        />
      )}
    </>
  );
};
