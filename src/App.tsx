/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SortBy } from './types/SortBy';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const loadTodos = useCallback(async () => {
    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
      setHasLoadingError(false);
    } catch {
      setHasLoadingError(true);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const formatedQuery = query.trim().toLowerCase();

  const filtredTodos = filterTodos(todos, formatedQuery, sortBy);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleChange={setQuery}
                sortBy={sortBy}
                handleSelect={setSortBy}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={filtredTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={setSelectedTodo}
                />
              ) : (
                <>
                  {hasLoadingError && <p>Sorry, Todos aren&apos;t loaded</p>}
                  <Loader />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} selectTodo={setSelectedTodo} />
      )}
    </>
  );
};
