/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    setLoadingTodos(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setLoadingUser(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setLoadingUser(false));
  }, [selectedTodo]);

  const visibleTodos = todos
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
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              <Loader />

              {!loadingTodos && (
                <TodoList
                  todos={visibleTodos}
                  onSelect={setSelectedTodo}
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
          user={user}
          loading={loadingUser}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
