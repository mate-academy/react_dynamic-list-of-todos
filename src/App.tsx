/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setError('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);

      return;
    }

    let isCurrentRequest = true;

    setSelectedUser(null);

    getUser(selectedTodo.userId)
      .then(user => {
        if (isCurrentRequest) {
          setSelectedUser(user);
        }
      })
      .catch(() => {
        if (isCurrentRequest) {
          setError('Could not load user details');
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [selectedTodo]);

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const handleShowMore = (todo: Todo) => {
    setSelectedTodo(prev => (prev?.id === todo.id ? null : todo));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {error && <p className="error-message">{error}</p>}

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelect={handleShowMore}
                selectedTodoId={selectedTodo ? selectedTodo.id : null}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
