/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo, FilterType } from './types';
import { getTodos } from './api';
import { getVisibleTodos } from './utils';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(allTodos => {
        setIsLoading(false);
        setTodos(allTodos);
      });
  }, []);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, filterType, query),
    [query, filterType, todos],
  );

  const showModal = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
    },
    [],
  );

  const hideModal = () => setSelectedTodo(null);

  const clearQuery = useCallback(
    () => setQuery(''),
    [],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterType={filterType}
                setQuery={setQuery}
                setFilter={setFilterType}
                clear={clearQuery}
              />
            </div>

            <div className="block">
              {
                isLoading
                  ? (
                    <Loader />
                  ) : (
                    <TodoList
                      todos={visibleTodos}
                      selected={selectedTodo}
                      onClick={showModal}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={hideModal} />
      )}
    </>
  );
};
