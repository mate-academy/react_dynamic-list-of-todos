/* eslint-disable max-len */
import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';
import { getVisibleTodos } from './utils/getVisibleTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [hasError, setHasError] = useState(false);
  const [appliedQuery, setAppliedQuery] = useState('');

  const closeModal = useCallback(
    () => {
      setSelectedTodo(null);
    },
    [],
  );

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => setAppliedQuery(query), 1000);

    return () => clearTimeout(timerId);
  }, [query]);

  const visibleTodos = useMemo(() => getVisibleTodos(todos, appliedQuery, status), [todos, appliedQuery, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {hasError && (
                <div className="notification is-warning">
                  Server error!
                </div>
              )}
              {isLoading && (
                <Loader />
              )}

              {todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
