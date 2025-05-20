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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load todos when the component mounts
  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
        setFilteredTodos(loadedTodos);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Apply filters when todos, statusFilter, or searchQuery changes
  useEffect(() => {
    let result = [...todos];

    // Filter by status
    if (statusFilter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (statusFilter === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(result);
  }, [todos, statusFilter, searchQuery]);

  // Load user data when a todo is selected
  useEffect(() => {
    if (selectedTodo) {
      setIsUserLoading(true);

      getUser(selectedTodo.userId)
        .then(user => {
          setSelectedUser(user);
        })
        .finally(() => {
          setIsUserLoading(false);
        });
    } else {
      setSelectedUser(null);
    }
  }, [selectedTodo]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
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
                searchQuery={searchQuery}
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={handleTodoSelect}
                  selectedTodoId={selectedTodo?.id}
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
