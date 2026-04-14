/* eslint-disable max-len */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
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
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [userError, setUserError] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setLoadingUser(false);
    setUserError(null);
  }, []);

  const visibleTodos = useMemo(() => {
    const byStatus = todos.filter(todo =>
      filter === 'all'
        ? true
        : filter === 'completed'
          ? todo.completed
          : !todo.completed,
    );

    return byStatus.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [todos, filter, query]);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setTodos([]);
      })
      .finally(() => setLoadingTodos(false));
  }, []);

  const showTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
    setUserError(null);
    setLoadingUser(true);
    setSelectedUser(null);

    getUser(todo.userId)
      .then(user => setSelectedUser(user))
      .catch(err => {
        setUserError(err?.message ?? 'Failed to load user');
      })
      .finally(() => setLoadingUser(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {(loadingTodos || loadingUser) && <Loader />}
              <TodoList
                todos={visibleTodos}
                onShow={showTodo}
                onHide={closeModal}
                selectedTodoId={selectedTodo?.id ?? null}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={selectedUser}
        loading={loadingUser}
        userError={userError}
        onClose={closeModal}
      />
    </>
  );
};
