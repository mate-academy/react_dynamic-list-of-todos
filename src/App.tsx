/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleTodos = todos.filter(todo => {
    if (statusFilter === 'active' && todo.completed) {
      return false;
    }

    if (statusFilter === 'completed' && !todo.completed) {
      return false;
    }

    if (
      searchQuery &&
      !todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleSelectTodo = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      setSelectedTodo(null);
      setSelectedUser(null);
      setIsUserLoading(false);

      return;
    }

    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsUserLoading(true);
    getUser(todo.userId)
      .then(user => setSelectedUser(user))
      .finally(() => setIsUserLoading(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setIsUserLoading(false);
  };

  const handleStatusFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsTodosLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                searchQuery={searchQuery}
                onStatusFilterChange={handleStatusFilterChange}
                onSearchQueryChange={handleSearchQueryChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}
              {!isTodosLoading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          isUserLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
