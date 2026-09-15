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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsTodosLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return todos.filter(todo => {
      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setUser(null);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsUserLoading(false));
  };

  const handleModalClose = () => {
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
                onQueryChange={handleQueryChange}
                onStatusChange={handleStatusChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}

              {!isTodosLoading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id}
                  onTodoSelect={handleTodoSelect}
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
