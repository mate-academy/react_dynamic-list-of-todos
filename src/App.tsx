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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const loadTodos = useCallback(async () => {
    try {
      setTodos(await getTodos());
      setHasLoadingError(false);
    } catch (error) {
      if (error instanceof Error) {
        /* eslint no-console: */
        console.log("Todos aren't loaded");
        setHasLoadingError(true);
      }
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const filtredTodos = todos.filter(todo => {
    const formatedQuery = query.trim().toLowerCase();
    const titleIncludesQuery = todo.title.toLowerCase().includes(formatedQuery);

    switch (sortBy) {
      case SortBy.Active:
        return !todo.completed && titleIncludesQuery;

      case SortBy.All:
        return titleIncludesQuery;

      case SortBy.Completed:
        return todo.completed && titleIncludesQuery;

      default:
        throw new Error('Incorect sortBy parameter');
    }
  });

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
