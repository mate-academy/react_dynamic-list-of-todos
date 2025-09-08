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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);
      setIsUserLoading(false);

      return;
    }

    setIsUserLoading(true);

    getUser(selectedTodo.userId)
      .then(user => setSelectedUser(user))
      .finally(() => setIsUserLoading(false));
  }, [selectedTodo]);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all'
        ? true
        : status === 'completed'
          ? todo.completed
          : !todo.completed;

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
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
          isUserLoading={isUserLoading}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
