/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsTodosLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsUserLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setIsUserLoading(false));
  }, [selectedTodo]);

  const visibleTodos = useMemo(() => {
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
      .filter(todo =>
        todo.title.toLowerCase().includes(query.trim().toLowerCase()),
      );
  }, [todos, status, query]);

  const closeModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChange={setQuery}
                onStatusChange={setStatus}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}

              <TodoList
                todos={isTodosLoading ? [] : visibleTodos}
                selectedTodoId={selectedTodo?.id ?? null}
                onTodoSelect={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isUserLoading}
          onClose={closeModal}
        />
      )}
    </>
  );
};
