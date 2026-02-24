/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(
    debounce((val: string) => setAppliedQuery(val), 1000),
    [],
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const handleClearQuery = () => {
    setQuery('');
    setAppliedQuery('');
  };

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(appliedQuery.toLowerCase());
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'completed' && todo.completed) ||
        (activeFilter === 'active' && !todo.completed);

      return matchesQuery && matchesFilter;
    });
  }, [todos, appliedQuery, activeFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
                onFilterChange={setActiveFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setModalInfo={setModalInfo}
                  modalInfo={modalInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalInfo && (
        <TodoModal
          todo={modalInfo}
          setModalInfo={setModalInfo}
          getUser={getUser}
        />
      )}
    </>
  );
};
