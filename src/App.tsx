import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// components
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

// utils
import { getFilteredTodos } from './utils/getFiltetredTodos';

// get data from server
import { getTodos } from './api';

// types
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadHasError, setLoadHasError] = useState(true);

  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);
  const [query, setQuery] = useState('');

  const getAllTodos = useCallback(async () => {
    setLoadHasError(true);

    try {
      const allTodos = await getTodos();

      setTodos(allTodos);
      setLoadHasError(false);
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

  const selectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

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

              {isLoaded && loadHasError && (
                <p>No loaded user</p>
              )}

              {isLoaded && !loadHasError && (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={selectTodo}
                  selectedTodo={selectedTodo}
                />
              ) }
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
