/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import {
  TodoFilter,
  type Status,
} from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
      })
      .catch(() => {
        setTodos([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(normalizedQuery);

      const matchesStatus =
        status === 'all'
        || (status === 'active' && !todo.completed)
        || (status === 'completed' && todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
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
                onQueryClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id ?? null}
                  onTodoSelect={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
