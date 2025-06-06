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

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState<Todo[]>([]);
  const [isTodosLoad, setIsTodoLoad] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState<Status>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsTodoLoad(true);

    getTodos()
      .then(todosData => {
        setLoadingTodos(todosData);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch todos:', error);
      })
      .finally(() => {
        setIsTodoLoad(false);
      });
  }, []);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);

    setIsUserLoading(true);

    getUser(todo.userId)
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch user:', error);
        setUser(null);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setUser(null);
    setIsUserLoading(false);
  };

  const visibleTodos = useMemo(() => {
    let filtered = [...loadingTodos];

    if (statusFilter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (statusFilter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (searchQuery.trimStart()) {
      filtered = filtered.filter(todo =>
        todo.title
          .toLowerCase()
          .includes(searchQuery.trimStart().toLowerCase()),
      );
    }

    return filtered;
  }, [loadingTodos, statusFilter, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {isTodosLoad ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelect={handleTodoSelect}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleModalClose}
          user={user}
          isLoading={isUserLoading}
        />
      )}
    </>
  );
};
