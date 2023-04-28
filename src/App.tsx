/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/FilterTypes';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const getVisibleTodos = (
  todos: Todo[],
  filterType: string,
  query: string,
): Todo[] => {
  let visibleTodos: Todo[] = [...todos];

  switch (filterType) {
    case FilterType.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case FilterType.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return visibleTodos.filter(
    todo => todo.title.toLowerCase().includes(
      query.toLowerCase(),
    ),
  );
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(FilterType.ALL);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(true));
  }, []);

  const visibleTodos = getVisibleTodos(todos, selectedType, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {isLoading && !hasError && (
                <TodoFilter
                  query={query}
                  onQueryChange={setQuery}
                  selectedType={selectedType}
                  onSelectedType={setSelectedType}
                />
              )}

            </div>

            {hasError && (
              <div className="notification is-danger">
                An error occured when loading data!
              </div>
            )}

            <div className="block">
              {isLoading
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedModal={selectedTodo}
                    onSelectedModal={setSelectedTodo}
                  />
                )
                : (
                  <Loader />
                )}
            </div>

          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedModal={selectedTodo}
          onSelectedModal={setSelectedTodo}
        />
      )}
    </>
  );
};
