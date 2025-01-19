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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [error, setError] = useState<string | null>(null); // Для обробки помилок

  // Завантаження списку todos
  useEffect(() => {
    setLoading(true);
    setError(null); // Очистити попередню помилку
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setFilteredTodos(fetchedTodos);
      })
      .catch(() => {
        setError('Failed to load todos. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Фільтрація списку todos
  useEffect(() => {
    const newFilteredTodos = todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);

      return matchesQuery && matchesStatus;
    });

    setFilteredTodos(newFilteredTodos);
  }, [query, status, todos]);

  // Відкриття модального вікна з інформацією про todo
  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setLoadingUser(true);
    setError(null); // Очистити попередню помилку
    getUser(todo.userId)
      .then(fetchedUser => {
        setUser(fetchedUser);
      })
      .catch(() => {
        setError('Failed to load user information. Please try again later.');
      })
      .finally(() => {
        setLoadingUser(false);
      });
  };

  // Закриття модального вікна
  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  // Оновлення фільтра
  const handleFilterChange = ({
    query: newQuery,
    status: newStatus,
  }: {
    query: string;
    status: string;
  }) => {
    setQuery(newQuery);
    setStatus(newStatus);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {/* Відображення помилок */}
            {error && (
              <div className="notification is-danger">
                <button className="delete" onClick={() => setError(null)} />
                {error}
              </div>
            )}

            <div className="block">
              <TodoFilter onFilterChange={handleFilterChange} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onTodoClick={handleShowModal}
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
          loadingUser={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
