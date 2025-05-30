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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...todos];

    if (statusFilter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (statusFilter === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (query) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setFilteredTodos(result);
  }, [statusFilter, query, todos]);

  useEffect(() => {
    if (selectedTodo) {
      setLoading(true);

      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .finally(() => setLoading(false));
    } else {
      setSelectedUser(null);
    }
  }, [selectedTodo]);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleQueryChange = (queryStr: string) => {
    setQuery(queryStr);
  };

  const handleSearchClear = () => {
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
                statusFilter={statusFilter}
                query={query}
                onStatusChange={handleStatusChange}
                onSearchChange={handleQueryChange}
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
                  selectedTodoId={selectedTodo?.userId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <TodoModal
          loading={loading}
          todo={selectedTodo}
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
