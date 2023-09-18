import React, { useEffect, useState } from 'react';

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

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  // eslint-disable-next-line max-len
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  // eslint-disable-next-line max-len
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(DEFAULT_FILTER);
  // чи можливо відключати еслінт якщо в такому разі код буде більш зрозумілим.

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setVisibleTodos)
      .finally(() => setIsTodosLoading(false));
  }, []);

  useEffect(() => {
    getTodos().then((todos) => {
      const filtered = filterTodos(todos, filterOptions);

      setVisibleTodos(filtered);
    });
  }, [filterOptions]);

  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterOptions((prevState) => (
      {
        ...prevState,
        filterType: event.target.value,
      }
    ));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions((prevState) => (
      {
        ...prevState,
        query: event.target.value,
      }
    ));
  };

  const handleResetInput = () => {
    setFilterOptions((prevState) => (
      {
        ...prevState,
        query: '',
      }
    ));
  };

  const handleTodoSelection = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClosing = () => {
    setSelectedTodo(null);
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
              {isTodosLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelect={handleTodoSelection}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleModalClosing}
        />
      )}
    </>
  );
};
