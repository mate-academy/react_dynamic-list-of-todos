import React, { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo, TodoWithUser } from './types/Todo';
import { getTodos, getUser } from './api';
import { filterTodos } from './helpers';
import { FilterOptions } from './types/FilterOptions';
import { DEFAULT_FILTER } from './constants';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoWithUser | Todo | null>(
    null,
  );
  // eslint-disable-next-line max-len
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(DEFAULT_FILTER);

  useEffect(() => {
    getTodos().then(setVisibleTodos);
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

    getUser(todo.userId).then((userFounded) => {
      setSelectedTodo(
        {
          ...todo,
          user: userFounded,
        },
      );
    });
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
              {visibleTodos.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={handleTodoSelection}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal todo={selectedTodo} onClose={handleModalClosing} />
      )}
    </>
  );
};
