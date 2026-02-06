/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

export type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todo => setTodos(todo))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredList = useMemo(() => {
    return todos.filter(todo => {
      let statusMatch = true;

      if (status === 'active') {
        statusMatch = !todo.completed;
      } else if (status === 'completed') {
        statusMatch = todo.completed;
      }

      const queryMatch = todo.title.toLowerCase().includes(query.toLowerCase());

      return statusMatch && queryMatch;
    });
  }, [todos, status, query]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalUser(null);
    setIsUserLoading(true);

    getUser(todo.userId)
      .then(setModalUser)
      .finally(() => setIsUserLoading(false));
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
                status={status}
                onQueryChange={setQuery}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredList} onSelect={handleTodoSelect} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={modalUser}
          loading={isUserLoading}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
