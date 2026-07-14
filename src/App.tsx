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
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  const openTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsLoadingUser(true);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setIsLoadingUser(false));
  };

  const closeTodo = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

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
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, status, query]);

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
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}

              {!isLoadingTodos && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={openTodo}
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
          loading={isLoadingUser}
          onClose={closeTodo}
        />
      )}
    </>
  );
};
