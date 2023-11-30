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
import { SortType } from './types/SortType';

function getPreparedTodos(
  todos: Todo[],
  query: string,
  optionChange: SortType,
): Todo[] {
  let getNewTodos = [...todos];

  getNewTodos = getNewTodos.filter(todo => {
    switch (optionChange) {
      case SortType.Active:
        return !todo.completed;
      case SortType.Complited:
        return todo.completed;
      case SortType.All:
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
  const [selectedSortType, setSelectedSortType] = useState<SortType>(SortType.All);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleSelectedTodo = (todo: Todo | null) => setSelectedTodo(todo);

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSortType(event.target.value as SortType);
  };

  const handleResetQuery = () => {
    setQuery('');
  };

  const visibleTodos = getPreparedTodos(todos, query, selectedSortType);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(() => console.error(ERROR_MESSAGE))
      .finally(() => setIsLoading(false));
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
                onQuery={handleQuery}
                onResetQuery={handleResetQuery}
                selectedSortType={selectedSortType}
                handleSelectFilter={handleSelectFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    selectedTodo={selectedTodo}
                    todos={visibleTodos}
                    onSelectedTodo={handleSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={handleSelectedTodo}
        />
      )}
    </>
  );
};
