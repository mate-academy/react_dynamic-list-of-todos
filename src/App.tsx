/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api';

function getVisibleTodos(todos: Todo[], status: Status, query: string): Todo[] {
  const normalizedQuery = query.trim().toLowerCase();

  return todos.filter(todo => {
    if (status === 'active' && todo.completed) {
      return false;
    }

    if (status === 'completed' && !todo.completed) {
      return false;
    }

    return todo.title.toLowerCase().includes(normalizedQuery);
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = getVisibleTodos(todos, status, query);

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
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {hasError && (
                <p className="has-text-danger">Unable to load todos</p>
              )}

              {!isLoading && !hasError && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
