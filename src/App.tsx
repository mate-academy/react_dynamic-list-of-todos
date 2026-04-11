/* eslint-disable */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [currentTodoList, setCurrentTodoList] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const handleUpdateQuery = (newQuery: string) => setCurrentQuery(newQuery);
  const handleUpdateStatus = (newStatus: string) => setStatus(newStatus);
  const handleClear = () => setCurrentQuery('');

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsUserLoading(true);
    getUser(todo.userId)
      .then(user => setSelectedUser(user))
      .finally(() => setIsUserLoading(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todos => setCurrentTodoList(todos))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = currentTodoList
    .filter(todo => {
      if (status === 'active') return !todo.completed;
      if (status === 'completed') return todo.completed;
      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(currentQuery.toLowerCase())
    );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={handleUpdateStatus}
                currentQuery={currentQuery}
                onTextQueryChange={handleUpdateQuery}
                onTextClear={handleClear}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={handleSelectTodo}
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
          isUserLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
