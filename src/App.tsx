/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(error => setErrorMessage(error.message || 'Failed to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(prev => (prev?.id === todo.id ? null : todo));
  };

  const visibleTodos = todos.filter(
    todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()) &&
      (status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed)),
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
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {errorMessage && (
                <div
                  className="notification is-danger"
                  data-cy="errorNotification"
                >
                  {errorMessage}
                </div>
              )}
              {loading && <Loader />}

              <TodoList
                todos={visibleTodos}
                onSelect={handleSelectTodo}
                selectedTodo={selectedTodo}
              />
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
