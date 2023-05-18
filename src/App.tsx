/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Sort } from './utils/enums';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const [sort, setSort] = useState('all');
  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadTodos = useCallback(async () => {
    try {
      const todoList = await getTodos();

      setIsLoading(false);
      setTodos(todoList);
    } catch {
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const openModal = (userId: number, todo: Todo) => {
    setModalOpen(true);
    getUser(userId).then(user => setSelectedUser(user));
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setSelectedTodo(null);
  };

  const filterTodos = todos.filter(todo => {
    const inputFilter = todo.title.toLowerCase().includes(query.trim().toLowerCase());

    switch (sort) {
      case Sort.Active: return inputFilter && !todo.completed;
      case Sort.Completed: return inputFilter && todo.completed;
      default: return inputFilter;
    }
  });

  const visibleTodos = filterTodos;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                sort={sort}
                setSort={setSort}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {hasError
              && <h2>Sorry, something went wrong</h2>}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                openModal={openModal}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          selectedUser={selectedUser}
          selectedTodo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
