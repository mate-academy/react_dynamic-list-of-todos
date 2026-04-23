/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { StatusFilter, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let isMounted = true;

    getTodos()
      .then(loadedTodos => {
        if (isMounted) {
          setTodos(loadedTodos);
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
      setSelectedUser(null);
      setIsLoadingUser(false);

      return undefined;
    }

    let isMounted = true;

    setSelectedUser(null);
    setIsLoadingUser(true);

    getUser(selectedTodo.userId)
      .then(user => {
        if (isMounted) {
          setSelectedUser(user);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingUser(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedTodo]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(currentTodo => (currentTodo?.id === todo.id ? null : todo));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}

              {!isLoadingTodos && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id || null}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={selectedUser}
        isLoadingUser={isLoadingUser}
        onClose={() => setSelectedTodo(null)}
      />
    </>
  );
};
