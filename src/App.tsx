import React, { useState, useEffect, useMemo, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load todos on component mount
  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        // Optionally handle error, e.g., set an error state or show a message to the user
      })
      .finally(() => setLoadingTodos(false));
  }, []);

  // Load user details when a todo is selected
  useEffect(() => {
    if (selectedTodo) {
      setLoadingUser(true);
      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .catch(() => {
          // Optionally handle error, e.g., set an error state or show a message to the user
        })
        .finally(() => setLoadingUser(false));
    } else {
      setSelectedUser(null); // Clear user if no todo is selected
    }
  }, [selectedTodo]);

  const handleSelectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleFilterChange = useCallback((status: FilterStatus) => {
    setFilterStatus(status);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const filteredTodos = useMemo(() => {
    let currentTodos = [...todos];

    // Filter by status
    if (filterStatus === 'active') {
      currentTodos = currentTodos.filter(todo => !todo.completed);
    } else if (filterStatus === 'completed') {
      currentTodos = currentTodos.filter(todo => todo.completed);
    }

    // Filter by search query
    if (searchQuery) {
      currentTodos = currentTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return currentTodos;
  }, [todos, filterStatus, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={filterStatus}
                searchQuery={searchQuery}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
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
          loading={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
