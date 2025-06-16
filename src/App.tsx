/* eslint-disable max-len */
// import React from 'react';
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
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filterBy, setFilterBy] = useState<FilterStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getTodos()
      .then(setTodos)
      .catch(() => setError('Failed to fetch todos'))
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (newFilter: FilterStatus) => {
    setFilterBy(newFilter);
  };

  const handleSearchTermChange = (newTerm: string) => {
    setSearchTerm(newTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredTodos = todos
    .filter(todo => {
      switch (filterBy) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
        default:
          return true;
      }
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const handleViewUserDetails = (currentTodo: Todo) => {
    const { userId } = currentTodo;

    setIsModalOpen(true);
    setLoadingUser(true);
    setUserError(null);
    setSelectedUser(null); // Clear previous user
    setSelectedTodo(currentTodo); // Definir o todo selecionado

    getUser(userId) // Usar o userId do todo
      .then(setSelectedUser)
      .catch(() => setUserError('Failed to fetch user details.'))
      .finally(() => setLoadingUser(false));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setUserError(null);
    setSelectedTodo(null); // Limpar o todo selecionado
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                currentFilter={filterBy}
                onFilterChange={handleFilterChange}
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {error && <p className="has-text-danger">{error}</p>}
              {!loading && !error && (
                <TodoList
                  todos={filteredTodos}
                  loading={loading}
                  error={error}
                  onViewUserDetails={handleViewUserDetails}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        todo={selectedTodo} // Passar o todo selecionado
        user={selectedUser}
        onClose={handleCloseModal}
        loadingUser={loadingUser}
        userError={userError}
      />
    </>
  );
};
