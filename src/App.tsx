/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const hasActiveFilter = query.trim() || status !== 'all';

  useEffect(() => {
    setIsLoader(true);
    getTodos()
      .then(Todoss => {
        setTodos(Todoss);
      })
      .finally(() => setIsLoader(false));
  }, []);

  useEffect(() => {
    if (!todos.length) {
      return;
    }

    let filtered = [...todos];

    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (status === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (status === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    setFilteredTodos(filtered);
  }, [todos, query, status]);

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setLoadingUser(true);
    setUser(null);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoadingUser(false));
  };

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
                onQueryChange={setQuery}
                onClear={() => setQuery('')}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isLoader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={hasActiveFilter ? filteredTodos : todos}
                  onSelect={openModal}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          isLoading={loadingUser}
          onClose={closeModal}
          user={user}
        />
      )}
    </>
  );
};
