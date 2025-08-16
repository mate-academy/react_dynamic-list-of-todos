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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let result = [...todos];

    if (statusFilter === 'completed') {
      result = result.filter(todo => todo.completed);
    } else if (statusFilter === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    if (query) {
      const normalizedQuery = query.toLowerCase();

      result = result.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    setFilteredTodos(result);
  }, [todos, statusFilter, query]);

  const handleTodoClick = (todo: Todo) => {
    setIsLoading(true);
    getUser(todo.userId)
      .then(user => {
        setSelectedUser(user);
        setSelectedTodo(todo);
      })
      .finally(() => setIsLoading(false));
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleQueryReset = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={handleStatusChange}
                onQueryChange={handleQueryChange}
                onReset={handleQueryReset}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} onTodoClick={handleTodoClick} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && selectedUser && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};
