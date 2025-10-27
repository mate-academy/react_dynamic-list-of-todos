/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'completed' | 'active'>('all');

  // 1. Load todos on mount
  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Failed to load todos'))
      .finally(() => setIsTodosLoading(false));
  }, []);

  // 4. Show modal and load user
  const handleShow = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setSelectedUser(null);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(setSelectedUser)
      .catch(() => setErrorMessage('Failed to load user'))
      .finally(() => setIsUserLoading(false));
  };

  // 7. Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedUser(null);
    setErrorMessage(null);
  };

  // 8. Filter by status
  const filteredByStatus = todos.filter(todo => {
    if (status === 'completed') {
      return todo.completed;
    }

    if (status === 'active') {
      return !todo.completed;
    }

    return true;
  });

  // 9. Filter by query
  const filteredTodos = filteredByStatus.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              query={query}
              onQueryChange={setQuery}
              onClearQuery={() => setQuery('')}
              status={status}
              onStatusChange={setStatus}
            />
          </div>

          <div className="block">
            {/* 2. Show loader while loading todos */}
            {isTodosLoading && <Loader />}

            {!isTodosLoading && (
              <>
                {filteredTodos.length > 0 ? (
                  <TodoList todos={filteredTodos} onShow={handleShow} />
                ) : (
                  <p className="has-text-grey">No todos match your filters.</p>
                )}
              </>
            )}

            {errorMessage && (
              <p className="notification is-danger">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>

      {/* 5. Show modal with user details */}
      {isModalOpen && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoading} // 6. Show loader while loading user
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
