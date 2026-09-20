/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [status, setStatus] = useState<FilterStatus>('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(({ completed, title }) => {
      const matchesStatus =
        status === 'all' || (status === 'active' ? !completed : completed);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        title.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, status, todos]);

  const selectedTodo = todos.find(({ id }) => id === selectedTodoId) ?? null;

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodoId(todo.id);
    setSelectedUser(null);
    setIsLoadingUser(true);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setIsLoadingUser(false));
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
    setSelectedUser(null);
    setIsLoadingUser(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}
              {!isLoadingTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodo={handleSelectTodo}
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
        onClose={handleCloseModal}
      />
    </>
  );
};
