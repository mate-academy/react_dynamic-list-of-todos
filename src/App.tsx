/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import type { TodoStatus } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import type { Todo } from './types/Todo';
import type { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TodoStatus>('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getTodos()
      .then(loadedTodos => {
        if (isMounted) {
          setTodos(loadedTodos);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTodos([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingTodos(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    let isCurrent = true;

    getUser(selectedTodo.userId)
      .then(user => {
        if (isCurrent) {
          setSelectedUser(user);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setSelectedUser(null);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoadingUser(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [selectedTodo]);

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' ? todo.completed : !todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setIsLoadingUser(false);
  };

  const handleSelectTodo = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      handleCloseModal();

      return;
    }

    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsLoadingUser(true);
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
              {isLoadingTodos ? (
                <Loader />
              ) : (
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
          user={selectedUser}
          isLoading={isLoadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
