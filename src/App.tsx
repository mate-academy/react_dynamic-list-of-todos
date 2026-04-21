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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(receivedTodos => {
        setTodos(receivedTodos);
      })
      .catch(() => {
        throw new Error('Failed to load todos');
      })
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);

      return;
    }

    setIsLoadingUser(true);
    setSelectedUser(null);

    getUser(selectedTodo.userId)
      .then(userFromServer => {
        setSelectedUser(userFromServer);
      })
      .catch(() => {
        throw new Error('Failed to load user');
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, [selectedTodo]);

  const visibleTodos = useMemo(() => {
    let filteredTodos = [...todos];

    if (status === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (status === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return filteredTodos;
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
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id || 0}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isLoadingUser}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
