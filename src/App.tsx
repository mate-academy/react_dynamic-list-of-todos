/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import * as api from './api';

export const App: React.FC = () => {
  // Dane z API
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Interakcja z konkretnym Todo (Modal)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // Filtry
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  useEffect(() => {
    setIsLoading(true);
    api
      .getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Handlery nazwane zgodnie z konwencją (handleEvent)
  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleStatusChange = (value: Status) => {
    setStatus(value);
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  // Wyliczanie widocznych zadań (Derived State)
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [todos, status, query]);

  // Zwracanie widocznych zadań
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
                onQueryChange={handleQueryChange}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id || null}
                  onSelect={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
