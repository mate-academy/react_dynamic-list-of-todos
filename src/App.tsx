import React, { useCallback, useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

const getVisibleTodos = (
  todos: Todo[],
  filterType: FilterType,
  query: string,
) => {
  let visibleTodos = todos;

  switch (filterType) {
    case FilterType.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
      break;

    case FilterType.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
      break;

    default:
      break;
  }

  visibleTodos = visibleTodos.filter(
    todo => todo.title.toLowerCase().includes(
      query.toLowerCase().trim(),
    ),
  );

  return visibleTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [query, setQuery] = useState('');

  const handleTodoSelect = (id: number | null) => {
    setSelectedTodo(todos.find(todo => todo.id === id) || null);
  };

  const handleFilterChange = useCallback((typeOfFilter: FilterType) => {
    setFilterType(typeOfFilter);
  }, []);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = getVisibleTodos(todos, filterType, query);

  const renderingList = hasError
    ? (
      <h3>Error occured when data loaded</h3>
    )
    : (
      <TodoList
        todos={visibleTodos}
        onTodoSelected={handleTodoSelect}
        selectedTodo={selectedTodo}
      />
    );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                onChangeFilterType={handleFilterChange}
                query={query}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : renderingList}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            onTodoSelected={handleTodoSelect}
          />
        )}
    </>
  );
};
