/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // variables for sorting and filtering
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  // modal components state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(err => {
        setErrorMessage(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (statusFilter) {
        case 'all':
          return true;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return false;
      }
    });
  }, [todos, statusFilter]);

  const visibleTodos = useMemo(() => {
    return filteredTodos.filter(todo => {
      const normalizedQuery = query.toLowerCase();
      const normalizedTitle = todo.title.toLowerCase();

      if (query !== '') {
        return normalizedTitle.includes(normalizedQuery);
      }

      return true;
    });
  }, [filteredTodos, query]);

  function handleButtonClick() {
    setQuery('');
  }

  function handleTodoClick(todo: Todo) {
    setSelectedTodo(todo);
    setModalLoading(true);
    getUser(todo.userId || 0)
      .then(setSelectedUser)
      .finally(() => setModalLoading(false));
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    if (isModalOpen) {
      setIsModalOpen(false);
      setSelectedTodo(null);
      setSelectedUser(null);
    }
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                onSelectChange={setStatusFilter}
                query={query}
                onInputChange={setQuery}
                onButtonClick={handleButtonClick}
              />
            </div>

            {isLoading && <Loader />}

            {!isLoading && !errorMessage && todos.length > 0 && (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  onTodoClick={handleTodoClick}
                  selectedTodo={selectedTodo}
                />
              </div>
            )}

            {errorMessage && (
              <div className="notification is-danger" data-cy="error">
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <TodoModal
            isLoading={modalLoading}
            selectedTodo={selectedTodo}
            selectedUser={selectedUser}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};
