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
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
      })
      .finally(() => {
        setIsTodosLoading(false);
      });
  }, []);

  const selectedTodo = useMemo(
    () => todos.find(todo => todo.id === selectedTodoId) ?? null,
    [selectedTodoId, todos],
  );

  useEffect(() => {
    if (selectedTodo === null) {
      setSelectedUser(null);
      setIsUserLoading(false);

      return;
    }

    setIsUserLoading(true);

    getUser(selectedTodo.userId)
      .then(user => {
        setSelectedUser(user);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, [selectedTodo]);

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesStatus =
        status === 'all'
          ? true
          : status === 'completed'
            ? todo.completed
            : !todo.completed;

      const matchesQuery =
        normalizedQuery === '' ||
        todo.title.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, status, todos]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.currentTarget.value as StatusFilter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  const handleSelectTodo = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
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
                onStatusChange={handleStatusChange}
                onQueryChange={handleSearchChange}
                onClearQuery={handleClearSearch}
              />
            </div>

            <div className="block">
              {isTodosLoading ? <Loader /> : null}
              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodoId}
                onSelectTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={selectedTodo !== null}
        todo={selectedTodo}
        user={selectedUser}
        isLoading={isUserLoading}
        onClose={handleCloseModal}
      />
    </>
  );
};
