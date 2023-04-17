/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { findTodoById } from './helpers/findTodoById';
import { getFilteredTodos } from './helpers/getFilteredTodos';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [query, setQuery] = useState('');
  const [hasError, setHasError] = useState(false);

  const visibleTodos = getFilteredTodos(todos, filterType, query);
  const selectedTodo = findTodoById(selectedTodoId, visibleTodos);

  const fetchTodos = async () => {
    try {
      const apiTodos = await getTodos();

      setTodos(apiTodos);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
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
                setQuery={setQuery}
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && !hasError && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onSelect={setSelectedTodoId}
                />
              )}
              {hasError && (
                <h1>Something went wrong</h1>
              )}
            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo && (
          <TodoModal
            todo={selectedTodo}
            deselectTodo={() => setSelectedTodoId(0)}
          />
        )
      }
    </>
  );
};
