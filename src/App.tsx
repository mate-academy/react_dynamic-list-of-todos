/* eslint-disable max-len */
import React, { useEffect, useState, useCallback, useMemo } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setError('');

    getTodos()
      .then(loadedTodos => {
        if (!isCancelled) {
          setTodos(loadedTodos);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setError('Failed to load todos');
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSelectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleCloseTodo = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleStatusChange = useCallback((newStatus: string) => {
    setStatus(newStatus);
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [todos, status, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onStatusChange={handleStatusChange}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {error && <p className="notification is-danger">{error}</p>}

              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal selectedTodo={selectedTodo} onClose={handleCloseTodo} />
    </>
  );
};
