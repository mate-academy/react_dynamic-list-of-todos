/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<
    // eslint-disable-next-line @typescript-eslint/indent
    'all' | 'active' | 'completed'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setIsUserLoading(true);
      setSelectedUser(null);

      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .finally(() => setIsUserLoading(false));
    }
  }, [selectedTodo]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (filterStatus === 'active') {
          return !todo.completed;
        }

        if (filterStatus === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo => {
        if (!searchQuery.trim()) {
          return true;
        }

        return todo.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim());
      });
  }, [todos, filterStatus, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filterStatus}
                query={searchQuery}
                onStatusChange={setFilterStatus}
                onQueryChange={setSearchQuery}
                onQueryClear={() => setSearchQuery('')}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  onTodoShow={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={selectedUser}
        isLoading={isUserLoading}
        onClose={() => setSelectedTodo(null)}
      />
    </>
  );
};
