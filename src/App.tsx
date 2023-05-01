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
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setHasErrors(true))
      .finally(() => setIsLoading(false));
    // console.log(todos);
  }, []);

  const todosFilteredByStatus = useMemo(() => {
    return getTodosFilteredByStatus(todos, filteringOption);
  }, [filteringOption, isLoading]);

  const todosIncludeSearchQuery = useMemo(() => {
    return getTodosIncludeSearchQuery(todosFilteredByStatus, searchQuery);
  }, [filteringOption, searchQuery, isLoading]);

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
              {hasErrors && <p>Something went wrong try again later!</p>}
              {!isLoading && !hasErrors
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
