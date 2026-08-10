import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      setSelectedTodo(null);
      setUser(null);

      return;
    }

    setSelectedTodo(todo);
    setIsUserLoading(true);
    setUser(null);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [todos, status, query]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos</h1>

          <TodoFilter
            status={status}
            onStatusChange={setStatus}
            query={query}
            onQueryChange={setQuery}
          />

          {isLoading ? (
            <Loader />
          ) : (
            <TodoList
              todos={visibleTodos}
              selectedTodoId={selectedTodo?.id}
              onSelectTodo={handleSelectTodo}
            />
          )}
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
