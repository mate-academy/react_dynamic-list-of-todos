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
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsLoadingUser(true);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => {
        setIsLoadingUser(false);
      });
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setIsLoadingUser(false);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleClear = () => {
    setQuery('');
  };

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChange={handleQueryChange}
                onStatusChange={handleStatusChange}
                onClear={handleClear}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onTodoSelect={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={selectedUser}
        isLoading={isLoadingUser}
        onClose={handleModalClose}
      />
    </>
  );
};
