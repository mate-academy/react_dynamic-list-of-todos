/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';

import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { ERROR_MESSAGE } from './helpers/variables';

function getPreparedTodos(
  todos: Todo[],
  query: string,
  optionChange: string,
): Todo[] {
  let getNewTodos = [...todos];

  getNewTodos = getNewTodos.filter(todo => {
    switch (optionChange) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  });

  if (query) {
    getNewTodos = getNewTodos.filter(({ title }) => {
      const preparedTitle = title.trim().toLowerCase();
      const preparedQuery = query.trim().toLowerCase();

      return preparedTitle.includes(preparedQuery);
    });
  }

  return getNewTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectFilterChange, setselectFilterChange] = useState('all');
  const [isStatusLoaded, setisStatusLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleSelectedTodo = (todo: Todo | null) => setSelectedTodo(todo);

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setselectFilterChange(event.target.value);
  };

  const resetQuery = () => {
    setQuery('');
  };

  const visibleTodos = getPreparedTodos(todos, query, selectFilterChange);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => ERROR_MESSAGE)
      .finally(() => setisStatusLoaded(true));
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
                handleQuery={handleQuery}
                resetQuery={resetQuery}
                selectFilterChange={selectFilterChange}
                handleSelectFilter={handleSelectFilter}
              />
            </div>

            <div className="block">
              {!isStatusLoaded
                ? <Loader />
                : (
                  <TodoList
                    selectedTodo={selectedTodo}
                    todos={visibleTodos}
                    handleSelectedTodo={handleSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            handleSelectedTodo={handleSelectedTodo}
          />
        )}
    </>
  );
};
