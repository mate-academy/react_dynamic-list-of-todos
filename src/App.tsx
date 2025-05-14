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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
        setFilteredTodos(loadedTodos);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...todos];

    if (statusFilter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (statusFilter === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (searchQuery) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(result);
  }, [statusFilter, searchQuery, todos]);

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

  const handleSearchClear = () => {
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
                onSearchClear={handleSearchClear}
              />
            </div>

            <div className="block">
              {loading ? (
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
