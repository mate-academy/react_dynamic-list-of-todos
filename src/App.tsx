/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useState, useEffect } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodos, setSelectedTodos] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => setTodos(data))
      .then(() => setLoading(false));
  }, []);

  function handleShow(todo) {
    setSelectedTodos(todo);
    setLoadingUser(true);
    getUser(todo.userId)
      .then(userDetail => setUser(userDetail))
      .then(() => setLoadingUser(false));
  }

  function handleClose() {
    setUser(null);
    setSelectedTodos(null);
  }

  const visibleTodos = todos
    .filter(todo =>
      filter === 'all'
        ? true
        : filter === 'completed'
          ? todo.completed === true
          : filter === 'active'
            ? todo.completed === false
            : null,
    )
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                onQueryChange={setQuery}
                onFilterChange={setFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onShow={handleShow}
                selectedTodo={selectedTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodos && (
        <TodoModal
          todo={selectedTodos}
          user={user}
          loadingUser={loadingUser}
          onClose={handleClose}
        />
      )}
    </>
  );
};
