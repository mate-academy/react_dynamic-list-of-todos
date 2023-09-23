/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useFetch } from './hooks/useFetch';
import { ErrorModal } from './components/ErrorModal';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { dataCollection, isLoading, error } = useFetch<Todo[]>(getTodos);

  const filteredByActiveFilter = useMemo(() => {
    if (dataCollection) {
      switch (activeFilter) {
        case 'Completed':
          return dataCollection?.filter(todo => todo.completed);
        case 'Active':
          return dataCollection?.filter(todo => !todo.completed);
        case 'All':
        default:
          return dataCollection;
      }
    } else {
      return [];
    }
  }, [activeFilter, dataCollection]);

  const filteredByQuery = useMemo(() => {
    return filteredByActiveFilter.filter(todo => todo.title.toUpperCase().includes(query.toUpperCase()));
  }, [query, filteredByActiveFilter]);

  if (error) {
    return (
      <ErrorModal error={error.message} />
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={setQuery}
                onFilterChange={setActiveFilter}
                query={query}
                filter={activeFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredByQuery}
                  onSelectingTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} onModalClose={setSelectedTodo} />}
    </>
  );
};
