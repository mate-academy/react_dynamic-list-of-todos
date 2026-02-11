/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('all');

  const [loadingTodos, setLoadingTodos] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [todos, query]);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))

      .finally(() => setLoadingTodos(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setLoadingUser(true);

    getUser(selectedTodo.userId)
      .then(data => setUser(data))

      .finally(() => setLoadingUser(false));
  }, [selectedTodo]);

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
                setSortBy={setSortBy}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  sortBy={sortBy}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
              {selectedTodo && (
                <TodoModal
                  todo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  user={user}
                  loadingUser={loadingUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
