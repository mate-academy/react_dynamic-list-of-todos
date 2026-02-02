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
  const [isTodosLoading, setIsTodosLoading] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsTodosLoading(false);
      });
  }, []);

  const handleStatusChange = (newStatus: StatusFilter) => {
    setStatus(newStatus);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleSelectTodo = (todoId: number) => {
    const todoToSelect = todos.find(todo => todo.id === todoId) || null;

    setSelectedTodo(todoToSelect);
    setUser(null);

    if (!todoToSelect) {
      return;
    }

    setIsUserLoading(true);

    getUser(todoToSelect.userId)
      .then(setUser)
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos
      .filter(todo => {
        switch (status) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      })
      .filter(todo => {
        if (!normalizedQuery) {
          return true;
        }

        return todo.title.toLowerCase().includes(normalizedQuery);
      });
  }, [todos, status, query]);

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
                onStatusChange={handleStatusChange}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}

              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodo?.id ?? null}
                onSelectTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isUserLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
