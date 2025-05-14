/* eslint-disable max-len */
import React from 'react';
import { useState, useEffect } from 'react';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const filteredTodos = todos.filter(todo => {
    const matchesText = todo.title.toLowerCase().includes(input.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesText && matchesStatus;
  });

  const handleInput = (value: string) => {
    setInput(value);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(user => {
        setSelectedUser(user);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                input={input}
                handleInput={handleInput}
                status={status}
                handleStatus={handleStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} onSelect={handleSelectTodo} />
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
          onClose={closeModal}
        />
      )}
    </>
  );
};
