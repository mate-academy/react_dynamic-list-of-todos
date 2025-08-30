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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(todosData => {
        setTodos(todosData);
      })
      .catch(() => {
        setErrorMessage('Error loading todos');
      })
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);

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

  const handleTodoSelect = async (todo: Todo) => {
    if (selectedTodo && selectedTodo.id === todo.id) {
      setSelectedTodo(null);
      setSelectedUser(null);

      return;
    }

    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsLoadingUser(true);

    try {
      const userData = await getUser(todo.userId);

      setSelectedUser(userData);
    } catch (e) {
      setErrorMessage('Error loading user');
    } finally {
      setIsLoadingUser(false);
    }
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : errorMessage ? (
                <p className="has-text-danger">{errorMessage}</p>
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id || null}
                  onTodoSelect={handleTodoSelect}
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
          isLoadingUser={isLoadingUser}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};
