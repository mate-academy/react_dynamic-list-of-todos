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

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  // eslint-disable-next-line prettier/prettier
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [search, setSearch] = useState('');

  const filteredTodos = todos
    .filter(todo => {
      if (statusFilter === 'all') {
        return true;
      }

      if (statusFilter === 'completed') {
        return todo.completed;
      }

      if (statusFilter === 'active') {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo => {
      const normalizedSearch = search.toLowerCase().trim();

      if (!normalizedSearch) {
        return true;
      }

      return todo.title.toLowerCase().includes(normalizedSearch);
    });

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then((user: User) => {
        setSelectedUser(user);
      })
      .catch(() => {
        setError('Failed to load user');
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(receivedTodos => {
        setTodos(receivedTodos);
        setError(null);
      })
      .catch(() => {
        setTodos([]);
        setError('Failed to load todos');
      })
      .finally(() => {
        setIsLoading(false);
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
                onStatusFilter={setStatusFilter}
                statusFilter={statusFilter}
                search={search}
                onSearch={setSearch}
              />
            </div>

            {error && <p>{error}</p>}
            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={handleShowTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        todo={selectedTodo}
        user={selectedUser}
        isLoading={isUserLoading}
        onClose={handleCloseModal}
      />
    </>
  );
};
