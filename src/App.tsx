/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// components
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

// get data from server
import { getTodos } from './api';

// types
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export function getFilteredTodos(
  todos: Todo[],
  filterType: FilterType,
  query: string,
) {
  let visibleTodos = [...todos];

  switch (filterType) {
    case FilterType.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case FilterType.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    case FilterType.ALL:
    default:
      break;
  }

  return visibleTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [loadHasError, setLoadHasError] = useState(false);

  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);
  const [query, setQuery] = useState('');

  const getAllTodos = useCallback(async () => {
    setLoadHasError(false);

    try {
      const allTodos = await getTodos();

      setTodos(allTodos);
      setIsTodosLoaded(true);
    } catch {
      setLoadHasError(true);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    getAllTodos();
  }, []);

  const visibleTodos = getFilteredTodos(todos, filterBy, query);
  // console.log(visibleTodos);

  const selectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, [selectedTodo]);

  const closeTodo = useCallback(() => {
    setSelectedTodo(null);
  }, [selectedTodo]);

  const clearFilters = () => {
    setQuery('');
    setFilterBy(FilterType.ALL);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                setQuery={setQuery}
                query={query}
                clearFilters={clearFilters}
              />
            </div>

            <div className="block">
              {!isLoaded && <Loader />}

              {loadHasError && (
                <p>No loaded user</p>
              )}

              {isTodosLoaded && (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={selectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeTodo={closeTodo}
        />
      )}
    </>
  );
};
