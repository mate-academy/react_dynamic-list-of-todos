/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [status, setStatus] = React.useState('all');
  const [query, setQuery] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    let matchesStatus = true;

    if (status === 'active') {
      matchesStatus = !todo.completed;
    }

    if (status === 'completed') {
      matchesStatus = todo.completed;
    }

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);

    getUser(todo.userId)
      .then(user => setSelectedUser(user))
      .catch(() => setErrorMessage('Unable to load users'));
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

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
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={handleSelectTodo}
                />
              )}
            </div>
            {errorMessage && (
              <p className="notification is-danger">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={closeModal}
        />
      )}
    </>
  );
};
