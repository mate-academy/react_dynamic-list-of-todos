/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  let visibleTodos = todos;

  if (status === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (status === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  if (query.trim() !== '') {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setTodos([]);
      })
      .finally(() => setIsTodosLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsUserLoading(true);
    setSelectedUser(null);

    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .catch(() => {
        setSelectedUser(null);
      })
      .finally(() => setIsUserLoading(false));
  }, [selectedTodo]);

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
                onQueryClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelect={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          isLoading={isUserLoading}
          onClose={() => {
            setSelectedTodo(null);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      )}
    </>
  );
};
