/* eslint-disable max-len */
import React, { useMemo, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/FilterBy';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRejectResponse, setHasRejectResponse] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);

  useEffect(() => {
    const onLoadGetTodos = async () => {
      try {
        const allTodos = await getTodos();

        setTodos(allTodos);
      } catch (error) {
        setHasRejectResponse(true);
      } finally {
        setIsLoading(false);
      }
    };

    onLoadGetTodos();
  }, []);

  const visibleTodos = useMemo(() => (
    getFilteredTodos(todos, filterBy, query)
  ), [query, filterBy, todos]);

  const hasError = !isLoading && hasRejectResponse;
  const hasNoError = !isLoading && !hasRejectResponse;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBy={filterBy}
                onChangeQuery={setQuery}
                onChangeFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {hasError && (
                <p>Error loading todos, please reload page</p>
              )}

              {hasNoError && (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id || 0}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onCloseModal={setSelectedTodo} />
      )}
    </>
  );
};
