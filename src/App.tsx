import React, { useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { filterTodos } from './helpers';
import { FilterOptions } from './types/FilterOptions';
import { DEFAULT_FILTER } from './constants';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(
    DEFAULT_FILTER,
  );

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, filterOptions);
  }, [filterOptions, todos]);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => setIsTodosLoading(false));
  }, []);

  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterOptions((prevState) => ({
      ...prevState,
      filterType: event.target.value as FilterType,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions((prevState) => ({
      ...prevState,
      query: event.target.value,
    }));
  };

  const handleResetInput = () => {
    setFilterOptions((prevState) => ({
      ...prevState,
      query: '',
    }));
  };

  const handleToggleModal = (todo?: Todo) => {
    if (todo) {
      setSelectedTodo(todo);
    } else {
      setSelectedTodo(null);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSearch={handleInputChange}
                onTypeChange={handleFilterTypeChange}
                onReset={handleResetInput}
                query={filterOptions.query}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={handleToggleModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleToggleModal} />
      )}
    </>
  );
};
