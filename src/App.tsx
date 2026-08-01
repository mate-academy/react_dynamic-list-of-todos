import React, { useEffect, useMemo, useState } from 'react';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(result => setTodos(result))
      .finally(() => setIsLoadingTodos(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsLoadingUser(true);

    getUser(todo.userId)
      .then(result => setSelectedUser(result))
      .finally(() => setIsLoadingUser(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const handleClearQuery = () => setQuery('');

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (status === 'active') {
          return !todo.completed;
        }

        if (status === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase().trim()),
      );
  }, [todos, status, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id ?? null}
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
          user={selectedUser}
          isLoading={isLoadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
