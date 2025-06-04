/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
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

function getVisibleTodos(
  todos: Todo[],
  statusFilter: 'all' | 'active' | 'completed',
  query: string,
): Todo[] {
  let preparedTodos = [...todos];

  if (statusFilter === 'active') {
    preparedTodos = preparedTodos.filter(todo => !todo.completed);
  } else if (statusFilter === 'completed') {
    preparedTodos = preparedTodos.filter(todo => todo.completed);
  }

  if (query.trim() !== '') {
    const lowerQuery = query.toLowerCase();

    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(lowerQuery),
    );
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'completed'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleTodos = getVisibleTodos(todos, statusFilter, searchQuery);
  const isLoading = loadingTodos || loadingUser;

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setTodos([]);
      })
      .finally(() => {
        setLoadingTodos(false);
      });
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setLoadingUser(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoadingUser(false));
    } else {
      setUser(null);
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={statusFilter}
                onFilterChange={value =>
                  setStatusFilter(value as 'all' | 'active' | 'completed')
                }
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          loadingUser={loadingUser}
          user={user}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
