/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => setErrorMessage(error.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setLoadingUser(false);

      return;
    }

    setLoadingUser(true);
    setSelectedUser(null);

    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .catch(error => setErrorMessage(error.message))
      .finally(() => {
        setLoadingUser(false);
      });
  }, [selectedTodo]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      // Filter by status
      if (statusFilter === 'active' && todo.completed) {
        return false;
      }

      if (statusFilter === 'completed' && !todo.completed) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const normalizedQuery = searchQuery.toLowerCase();
        const normalizedTitle = todo.title.toLowerCase();

        return normalizedTitle.includes(normalizedQuery);
      }

      return true;
    });
  }, [todos, statusFilter, searchQuery]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setLoadingUser(false);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={statusFilter}
                onStatusChange={handleStatusChange}
                query={searchQuery}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && errorMessage && (
                <div className="notification is-danger">{errorMessage}</div>
              )}
              {!loading && !errorMessage && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id || null}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={selectedUser}
        loading={loadingUser}
        onClose={handleCloseModal}
      />
    </>
  );
};
