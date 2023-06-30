/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { getTodos } from './api';
import { getFilteredTodos } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  const loadTodos = async () => {
    try {
      const todosArray = await getTodos();

      setTodos(todosArray);
      setIsLoading(false);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = getFilteredTodos(todos, query, filterBy);

  const closeTodo = () => {
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
                query={query}
                setQuery={setQuery}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {!isError
                ? (
                  <TodoList
                    todos={visibleTodos}
                    openTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                ) : (
                  <span>
                    Error, failed to load data from server.
                  </span>
                )}

              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          closeTodo={closeTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
