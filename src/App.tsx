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
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setLoading(true), 200);

    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 500);
      });
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setModalLoading(true);
    getUser(selectedTodo?.userId)
      .then(userFromServer => setUser(userFromServer))
      .finally(() => setModalLoading(false));
  }, [selectedTodo]);

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      if (statusFilter === 'active') {
        return !todo.completed;
      }

      if (statusFilter === 'completed') {
        return todo.completed;
      }

      return true;
    });

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
                filterStatus={statusFilter}
                onFilterChange={setStatusFilter}
              />
            </div>

            <div className="block">
              <Loader loading={loading} />
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          loading={modalLoading}
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          user={user}
        />
      )}
    </>
  );
};
