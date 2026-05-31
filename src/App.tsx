import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { User } from './types/User';

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setTodos([]))
      .finally(() => setIsTodosLoading(false));
  }, []);

  useEffect(() => {
    if (!currentTodo) {
      setUser(null);
      setIsUserLoading(false);

      return;
    }

    getUser(currentTodo.userId)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsUserLoading(false));
  }, [currentTodo]);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleTodos = todos
    .filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));

  const handleSelectTodo = (todo: Todo | null) => {
    setCurrentTodo(todo);
    setUser(null);
    setIsUserLoading(Boolean(todo));
  };

  const handleCloseModal = () => {
    setCurrentTodo(null);
    setUser(null);
    setIsUserLoading(false);
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
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  currentTodo={currentTodo}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        currentTodo={currentTodo}
        user={user}
        isLoading={isUserLoading}
        onClose={handleCloseModal}
      />
    </>
  );
};
