/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'completed' | 'active'
  >('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
  }, []);

  const filteredByStatus = todos.filter(todo => {
    if (statusFilter === 'all') {
      return true;
    }

    if (statusFilter === 'completed') {
      return todo.completed;
    }

    if (statusFilter === 'active') {
      return !todo.completed;
    }

    return true;
  });

  const filteredTodos = filteredByStatus.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setLoadingUser(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoadingUser(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              query={query}
              onQueryChange={setQuery}
            />
          </div>

          <div className="block">
            {loading && <Loader dataCy="loader" />}
            {!loading && (
              <TodoList
                todos={filteredTodos}
                onSelectTodo={handleSelectTodo}
                selectedTodoId={selectedTodo?.id}
                onDeselectTodo={handleCloseModal}
              />
            )}
          </div>

          {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loading={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
