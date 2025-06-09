/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

type TodoFilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filter, setFilter] = useState<TodoFilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  // const [isModalLoading, setIsModalLoading] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodo = useMemo(() => {
    let currentFilteredTodos = todos;

    if (filter === 'active') {
      currentFilteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      currentFilteredTodos = todos.filter(todo => todo.completed);
    }

    if (searchQuery.trim() !== '') {
      currentFilteredTodos = currentFilteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      );
    }

    return currentFilteredTodos;
  }, [todos, filter, searchQuery]);

  const handleTodoSelect = (todo: Todo | null) => {
    setSelectedTodo(todo);

    if (todo) {
      setIsUserLoading(true);
      getUser(todo.userId)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setIsUserLoading(false));
    } else {
      setUser(null);
      setIsUserLoading(false);
    }
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
    setUser(null);
    setIsUserLoading(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodo}
                  setSelectedTodo={handleTodoSelect}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isUserLoading}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};
