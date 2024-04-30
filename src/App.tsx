/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { StatusFilter, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    if (!todos) {
      return null;
    }

    const filtered = todos.filter(t => {
      const includesQuery = query
        ? t.title.toLowerCase().includes(query.trim().toLowerCase())
        : true;

      switch (statusFilter) {
        case 'active':
          return !t.completed && includesQuery;
        case 'completed':
          return t.completed && includesQuery;
        case 'all':
        default:
          return includesQuery;
      }
    });

    return filtered;
  }, [todos, statusFilter, query]);

  const selectedTodo = useMemo(() => {
    if (filteredTodos && selectedTodoId) {
      return filteredTodos.find(t => t.id === selectedTodoId);
    }

    return null;
  }, [selectedTodoId, filteredTodos]);

  const handleSelectTodo = (id: number | null) => setSelectedTodoId(id);

  const handleCloseModal = () => setSelectedTodoId(null);

  const handleStatusFilterChange = (status: StatusFilter) =>
    setStatusFilter(status);

  const handleSearchQueryChange = (newQuery: string) => setQuery(newQuery);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="section">
            <div className="container">
              <div className="box">
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter
                    query={query}
                    onSearch={handleSearchQueryChange}
                    onSelectFilter={handleStatusFilterChange}
                  />
                </div>
                <div className="block">
                  {filteredTodos ? (
                    <TodoList
                      todos={filteredTodos}
                      selectedTodoId={selectedTodoId}
                      onSelect={handleSelectTodo}
                    />
                  ) : isError ? (
                    <p>Something gone wrong</p>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            </div>
          </div>
          {selectedTodo && (
            <TodoModal todo={selectedTodo} close={handleCloseModal} />
          )}
        </>
      )}
    </>
  );
};
