import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState<
    'all' | 'completed' | 'active'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let result = [...todos];

    if (statusFilter === 'completed') {
      result = result.filter(todo => todo.completed);
    } else if (statusFilter === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();

      result = result.filter(todo =>
        todo.title.toLowerCase().includes(lowerQuery),
      );
    }

    setFilteredTodos(result);
  }, [todos, statusFilter, searchQuery]);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);

      return;
    }

    setIsUserLoading(true);
    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .finally(() => setIsUserLoading(false));
  }, [selectedTodo]);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleStatusFilterChange = (value: 'all' | 'completed' | 'active') => {
    setStatusFilter(value);
  };

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                onStatusChange={handleStatusFilterChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchQueryChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} onShowTodo={handleShowTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
