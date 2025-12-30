import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'active' && todo.completed) {
      return false;
    }

    if (statusFilter === 'completed' && !todo.completed) {
      return false;
    }

    if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={statusFilter}
                query={query}
                onStatusChange={setStatusFilter}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && !hasError && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId ?? undefined}
                  onSelectTodo={setSelectedTodoId}
                />
              )}

              {hasError && (
                <p className="has-text-danger">Unable to load todos</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== null && (
        <TodoModal
          todoId={selectedTodoId}
          onClose={() => setSelectedTodoId(null)}
        />
      )}
    </>
  );
};
