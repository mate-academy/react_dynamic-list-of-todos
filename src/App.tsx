/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<TodoStatus>('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    let matchesStatus = true;

    switch (status) {
      case 'active':
        matchesStatus = !todo.completed;
        break;

      case 'completed':
        matchesStatus = todo.completed;
        break;

      default:
        matchesStatus = true;
    }

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {errorMessage && (
              <p className="notification is-danger" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => {
            setSelectedTodo(null);
          }}
        />
      )}
    </>
  );
};
