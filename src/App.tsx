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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [userId, setUserId] = useState<number | 'all'>('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    return (
      todo.title.toLowerCase().includes(query.toLowerCase()) &&
      (status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed)) &&
      (userId === 'all' || todo.userId === userId)
    );
  });

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
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
                setQuery={setQuery}
                status={status}
                setStatus={setStatus}
                userId={userId}
                setUserId={setUserId}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p className="has-text-danger has-text-centered">{error}</p>
                  )}
                  {!error && (
                    <TodoList todos={visibleTodos} onShow={openModal} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </>
  );
};
