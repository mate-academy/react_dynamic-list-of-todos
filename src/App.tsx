/* eslint-disable max-len */
/* eslint-disable no-console */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import debounce from 'lodash/debounce';
import { TodoList } from './components/TodoList';
import { TodoFilterBlock } from './components/TodoFilterBlock';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Select } from './types/Select';
import { filterTodos, getTodoById, loadingTodos } from './utils/helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalTodoId, setModalTodoId] = useState(0);
  const [filter, setFilter] = useState<Select>(Select.ALL);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    loadingTodos(setTodos, setIsLoading, setHasLoadingError);
  }, []);

  const visibleTodos = useMemo(() => (
    filterTodos(filter, appliedQuery, todos)
  ), [appliedQuery, filter, todos]);

  const modalTodo = useMemo(() => (
    getTodoById(modalTodoId, todos)
  ), [modalTodoId]);

  const applyQuery = useCallback(debounce((value) => {
    setIsLoading(false);

    return setAppliedQuery(value);
  }, 700), []);

  const handleModalIdChange = useCallback((todoId) => {
    setModalTodoId(todoId);
  }, []);

  const handleCloseClick = useCallback(() => {
    setModalTodoId(0);
  }, []);

  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []);

  const handleQueryChange = useCallback((event) => {
    setIsLoading(true);
    setQuery(event.target.value);
    applyQuery(event.target.value);
  }, []);

  const handleInputReset = useCallback(() => {
    setQuery('');
    setAppliedQuery('');
  }, []);

  const showList = !!visibleTodos.length && !isLoading;
  const noTodos = !visibleTodos.length && !isLoading;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilterBlock
                filter={filter}
                onFilterChange={handleFilterChange}
                query={query}
                onQueryChange={handleQueryChange}
                onInputReset={handleInputReset}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {showList && (
                <TodoList
                  todos={visibleTodos}
                  onModalIdChange={handleModalIdChange}
                  todoId={modalTodoId}
                />
              )}

              {noTodos && (
                <p className="notification">No suitable todos</p>
              )}

              {hasLoadingError && (
                <p className="notification">Can`t load data from server</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalTodo && <TodoModal todo={modalTodo} onClose={handleCloseClick} />}
    </>
  );
};
