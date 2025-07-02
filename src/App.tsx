/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status>('all');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setIsUserLoading(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearQuery = () => {
    setSearchQuery('');
  };

  const handleStatusChange = (status: 'all' | 'active' | 'completed') => {
    setStatusFilter(status);
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && todo.completed) ||
      (statusFilter === 'active' && !todo.completed);

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
                status={statusFilter}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id || null}
                  onShow={handleShowTodo}
                />
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
