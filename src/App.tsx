/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { getTodos } from './api';

function getFilteredTodos(
  todos: Todo[],
  filterStatus: FilterStatus,
  query: string,
) {
  let preparedTodos: Todo[];

  switch (filterStatus) {
    case FilterStatus.ACTIVE:
      preparedTodos = todos.filter(todo => !todo.completed);
      break;

    case FilterStatus.COMPLETED:
      preparedTodos = todos.filter(todo => todo.completed);
      break;

    case FilterStatus.ALL:
    default:
      preparedTodos = todos;
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (query) {
    preparedTodos = preparedTodos.filter((todo) => {
      const normalizedTitle = todo.title.trim().toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState(FilterStatus.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([] as Todo[]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => (
    getFilteredTodos(todos, filterStatus, query)
  ), [todos, filterStatus, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}

              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectedChange={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
