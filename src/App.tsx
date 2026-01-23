/* eslint-disable max-len */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import * as api from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    api
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = useMemo<Todo[]>(() => {
    return todos.filter((todo: Todo) => {
      const isCompletedMatch =
        filterStatus === Status.Completed && todo.completed;
      const isActiveMatch = filterStatus === Status.Active && !todo.completed;
      const isAll = filterStatus === Status.All;

      const matchesStatus = isAll || isCompletedMatch || isActiveMatch;
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase().trim());

      return matchesStatus && matchesQuery;
    });
  }, [todos, filterStatus, query]);

  const handleQueryChange = useCallback((value: string) => setQuery(value), []);
  const handleStatusChange = useCallback(
    (status: Status) => setFilterStatus(status),
    [],
  );

  const handleShow = useCallback((todo: Todo) => {
    setSelectedTodo(prevTodo => {
      if (prevTodo?.id === todo.id) {
        return null;
      }

      return todo;
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filterStatus}
                query={query}
                onStatusChange={handleStatusChange}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {errorMessage && (
                <p className="notification is-danger">
                  {errorMessage}
                  <button
                    type="button"
                    className="delete"
                    onClick={() => setErrorMessage('')}
                  />
                </p>
              )}
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onShow={handleShow}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
