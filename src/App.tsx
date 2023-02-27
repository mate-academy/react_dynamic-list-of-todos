/* eslint-disable max-len */
import React, {
  useEffect, useState, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, Status } from './types/Todo';
import { filteredByStatus } from './components/FilteredByStatus/FilteredByStatus';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>(Status.ALL);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const todos = await getTodos();

        setVisibleTodos(todos);
        setHasError(false);
        setIsLoaded(true);
      } catch {
        setHasError(true);
        setIsLoaded(false);
      }
    }

    fetchData();
  }, []);

  const filteredTodos = filteredByStatus(visibleTodos, query, status);

  const onQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const resetQuery = useCallback(() => {
    setQuery('');
  }, []);

  const isLoadingFinished = (hasError && !isLoaded) || isLoaded;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={onQueryChange}
                resetQuery={resetQuery}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoadingFinished
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )
                : (
                  <Loader />
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
