/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

import { User } from './types/User';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(data => {
      setTodoList(data);
      setIsLoading(false);
    });
  }, []);

  const handleModal = (todo: Todo) => {
    setIsModalLoading(true);
    setIsModalOpen(true);
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then(user => {
        setSelectedUser(user);
      })
      .finally(() => {
        setIsModalLoading(false);
      });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const handleFiltering = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTodos = todoList.filter(todo => {
    if (filter === 'active' && todo.completed) {
      return false;
    }

    if (filter === 'completed' && !todo.completed) {
      return false;
    }

    if (
      normalizedQuery &&
      !todo.title.toLowerCase().includes(normalizedQuery)
    ) {
      return false;
    }

    return true;
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDeleteButton = () => {
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
                onFilterChange={handleFiltering}
                inputValue={query}
                onInputChange={handleInput}
                onDelete={handleDeleteButton}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onClick={handleModal}
                selected={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          selectedUser={selectedUser}
          selectedTodo={selectedTodo}
          isLoading={isModalLoading}
          onClose={handleClose}
        />
      )}
    </>
  );
};
