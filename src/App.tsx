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
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    return matchesStatus && matchesQuery;
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);

      return;
    }

    setLoadingUser(true);

    getUser(selectedTodo.userId)
      .then(user => setSelectedUser(user))
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
                onQueryChange={event => setQuery(event.target.value)}
                status={status}
                onStatusChange={setStatus}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelectTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          loading={loadingUser}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
