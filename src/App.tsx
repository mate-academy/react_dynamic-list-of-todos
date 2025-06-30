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
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load todos on mount
  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  // Load user when a todo is selected
  useEffect(() => {
    if (selectedTodo) {
      setIsLoadingUser(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setIsLoadingUser(false));
    } else {
      setUser(null);
    }
  }, [selectedTodo]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && todo.completed) ||
      (statusFilter === 'active' && !todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                status={statusFilter}
                onQueryChange={setSearchQuery}
                onStatusChange={setStatusFilter}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleSelectTodo}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isLoadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
