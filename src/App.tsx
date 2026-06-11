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
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const filteredTodos = todos.filter(todo => {
    let matchesStatus = true;

    if (status === 'active') {
      matchesStatus = !todo.completed;
    }

    if (status === 'completed') {
      matchesStatus = todo.completed;
    }

    let matchesQuery = true;

    if (query.trim()) {
      matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase().trim());
    }

    return matchesStatus && matchesQuery;
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);
      setUserLoading(false);

      return;
    }

    setUserLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setUserLoading(false));
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}

              {!loading && todos.length === 0 && (
                <p className="title is-5">There are no todos</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          loading={userLoading}
          todo={selectedTodo}
          user={user}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
