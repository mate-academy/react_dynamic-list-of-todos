/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(Status.all);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalTodo, setModalTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .catch(() => setErrorMsg('No response from server. Try again later.'))
        .finally(() => setLoading(false));
    }, 2000);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(
    debounce((value: string) => setAppliedQuery(value), 1000),
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(event.target.value);
    setQuery(event.target.value);
  };

  const handleFilterTodos = useCallback((newFilter: Status) => {
    setFilterBy(newFilter);
  }, []);

  const handleModalActive = useCallback(() => {
    setIsModalActive(!isModalActive);
  }, [isModalActive]);

  const hanldeModalTodo = useCallback((todo: Todo) => {
    setModalTodo(todo);
  }, []);

  const reset = () => {
    setAppliedQuery('');
    setQuery('');
  };

  const getFilteredTodos = () => {
    const { completed, active } = Status;
    const filteredByStatus = todos.filter(todo => {
      switch (filterBy) {
        case completed:
          return todo.completed;

        case active:
          return !todo.completed;

        default:
          return true; // Return all todos when no specific status filter is applied
      }
    });

    const filteredByQuery = filteredByStatus.filter(todo =>
      todo.title.toLowerCase().includes(appliedQuery.toLowerCase()),
    );

    return filteredByQuery;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleFilterTodos={handleFilterTodos}
                filterBy={filterBy}
                handleInputChange={handleInputChange}
                query={query}
                reset={reset}
              />
            </div>

            {loading && <Loader />}

            <div className="block">
              {!loading && !!todos.length && (
                <TodoList
                  isModalActive={isModalActive}
                  todos={getFilteredTodos()}
                  handleModalActive={handleModalActive}
                  hanldeModalTodo={hanldeModalTodo}
                />
              )}

              {!loading && !errorMsg && todos.length === 0 && (
                <p>There are no todos for you, sorry.</p>
              )}

              {errorMsg && <p>{errorMsg}</p>}
            </div>
          </div>
        </div>
      </div>

      {isModalActive && (
        <TodoModal
          handleModalActive={handleModalActive}
          modalTodo={modalTodo}
        />
      )}
    </>
  );
};
