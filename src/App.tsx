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
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);

      return;
    }

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(() => {
        setUser(null);
      })
      .finally(() => setModalLoading(false));
  }, [selectedTodo]);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    let matchesStatus = true;

    if (statusFilter === 'active') {
      matchesStatus = !todo.completed;
    }

    if (statusFilter === 'completed') {
      matchesStatus = todo.completed;
    }

    return matchesQuery && matchesStatus;
  });

  const handleSelectTodo = (todo: Todo) => {
    setModalLoading(true);
    setSelectedTodo(todo);
  };

  const handleResetQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={statusFilter}
                onStatusChange={setStatusFilter}
                onReset={handleResetQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={handleSelectTodo}
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
          onClose={() => setSelectedTodo(null)}
          isModalLoading={modalLoading}
        />
      )}
    </>
  );
};
