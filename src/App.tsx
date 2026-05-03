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

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos
      .filter(todo => {
        if (status === 'completed') {
          return todo.completed;
        }

        if (status === 'active') {
          return !todo.completed;
        }

        return true;
      })
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }, [query, status, todos]);

  const handleTodoSelect = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      setSelectedTodo(null);
      setSelectedUser(null);

      return;
    }

    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsLoadingUser(true);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setIsLoadingUser(false));
  };

  const closeModal = () => {
    setSelectedTodo(null);
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
                onStatusChange={value => setStatus(value as StatusFilter)}
                onQueryChange={setQuery}
                onQueryClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id || null}
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
        onClose={closeModal}
      />
    </>
  );
};
