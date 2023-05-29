/* eslint-disable max-len */
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { filteredTodos } from './utils/function';
import { SelectFilter } from './types/SelectFilter';

export const App: React.FC = () => {
  const [todosToUse, setTodosToUse] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState<SelectFilter>(SelectFilter.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setIsLoading(false);
        setTodosToUse(todosFromServer);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filterTodos = useMemo(() => {
    return filteredTodos(todosToUse, selectFilter, query);
  }, [todosToUse, selectFilter, query]);

  const onChangedQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    }, [],
  );

  const resetQuery = useCallback(() => {
    setQuery('');
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
                onChangedQuery={onChangedQuery}
                resetQuery={resetQuery}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            {hasError
              ? <span>No todos from server</span>
              : (
                <div className="block">
                  {isLoading
                    ? <Loader />
                    : (
                      <TodoList
                        todos={filterTodos}
                        selectedTodo={selectedTodo}
                        setSelectedTodo={setSelectedTodo}
                      />
                    )}
                </div>
              )}
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
