/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const visibleTodos = useMemo(() => {
    if (query.trim()) {
      return todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    if (selectedStatus === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    if (selectedStatus === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [todos, query, selectedStatus]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        // .catch(() => setErrorMessage('Try again later'))
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} setQuery={setQuery} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              <TodoList items={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {/* `      <TodoModal /> */}
      `
      {' '}
    </>
  );
};
