/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useCallback, useEffect, useState } from 'react';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

type Status = 'all' | 'active' | 'completed';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchTodos = useCallback(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodosFromServer(fetchedTodos);
      })
      .catch(error => setFetchError(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    setDisplayedTodos(() => {
      let todos: Todo[] = [];

      switch (status) {
        case 'active':
          todos = todosFromServer.filter(todo => !todo.completed);
          break;
        case 'completed':
          todos = todosFromServer.filter(todo => todo.completed);
          break;
        case 'all':
        default:
          todos = todosFromServer;
      }

      return todos.filter(todo => todo.title.toLowerCase().includes(query));
    });
  }, [status, query, todosFromServer]);

  const handleStatusChange = useCallback((newStatus: Status) => {
    setStatus(newStatus);
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery.toLowerCase());
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setFetchError(null);
    fetchTodos();
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSelect={value => handleStatusChange(value as Status)}
                onQueryChange={handleQueryChange}
                onClose={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : fetchError ? (
                <>
                  <div className="notification is-danger">{fetchError}</div>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="button is-link mt-4"
                  >
                    Reload todos
                  </button>
                </>
              ) : (
                <TodoList
                  todos={displayedTodos}
                  onSelect={handleSelectTodo}
                  selectedTodo={selectedTodo}
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

export default React.memo(App);
