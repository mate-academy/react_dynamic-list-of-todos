/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilteringOptions } from './types/FilteringOptions';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodosFilteredByStatus, getTodosIncludeSearchQuery } from './helpers/todosFiltering';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteringOption, setFilteringOption] = useState(FilteringOptions.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(({ message }) => setError(message))
      .finally(() => setIsLoading(false));
  }, []);

  const todosFilteredByStatus = useMemo(() => {
    return getTodosFilteredByStatus(todos, filteringOption);
  }, [todos, filteringOption]);

  const todosIncludeSearchQuery = useMemo(() => {
    return getTodosIncludeSearchQuery(todosFilteredByStatus, searchQuery);
  }, [todosFilteredByStatus, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteringOption={setFilteringOption}
                filteringOption={filteringOption}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {error && <p>{error}</p>}
              {!isLoading && !error
                && (
                  <TodoList
                    todos={todosIncludeSearchQuery}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
