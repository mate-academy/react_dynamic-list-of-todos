/* eslint-disable max-len */
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [modalLoading, setModalLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };
  const handleSelectedTodo = (todo: Todo) => {
    setModalLoading(true);
    setSelectedTodo(todo);
    getUser(todo.userId)
      .then(currentUser => setUser(currentUser))
      .finally(() => {
        setModalLoading(false);
      });
    setIsModalOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todos => {
        setTodos(todos);
        setAllTodos(todos);
      })
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
  }, [updatedAt]);

  useEffect(() => {
    let filtered = allTodos;

    if (query.trim() !== '') {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (status === 'active')
      filtered = filtered.filter(todo => !todo.completed);
    if (status === 'completed')
      filtered = filtered.filter(todo => todo.completed);

    setTodos(filtered);
  }, [query, status, allTodos]);

  function reload() {
    setUpdatedAt(new Date());
  }
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleQueryChange={handleQueryChange}
                query={query}
                setQuery={setQuery}
                handleStatusChange={handleStatusChange}
                status={status}
              />
            </div>
            {loading && <Loader />}

            <div className="block">
              {!loading && todos.length > 0 && (
                <TodoList todos={todos} onSelectedTodo={handleSelectedTodo} />
              )}

              {!loading && !errorMessage && todos.length === 0 && (
                <p className="title no-todos">There are no todos</p>
              )}

              {errorMessage && (
                <p className="notification is-danger">
                  {errorMessage}
                  <button onClick={reload}>Reload</button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setIsModalOpen(false)}
          user={user}
          loading={modalLoading}
        />
      )}
    </>
  );
};
