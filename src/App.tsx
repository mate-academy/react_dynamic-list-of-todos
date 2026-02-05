/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoModal } from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader/Loader';

import { Todo } from './types/Todo';
import { User } from './types/User';
import * as api from './api'; // <- dopasuj ścieżkę do Twojego api.ts (np. './api')

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);

  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsTodosLoading(true);

    api
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setTodos([]);
      })
      .finally(() => {
        setIsTodosLoading(false);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return todos
      .filter(todo => {
        if (status === 'active') {
          return !todo.completed;
        }

        if (status === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo => todo.title.toLowerCase().includes(normalized));
  }, [todos, status, query]);

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setUser(null);
    setIsUserLoading(true);

    api
      .getUser(todo.userId)
      .then(setUser)
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const closeModal = () => {
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
                status={status}
                query={query}
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id ?? null}
                  onSelectTodo={openModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={user}
        isLoading={isUserLoading}
        onClose={closeModal}
      />
    </>
  );
};
