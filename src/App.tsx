/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { StatusState, Filters, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: StatusState.All,
    query: '',
  });

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleStatusChange = useCallback((newStatus: StatusState) => {
    setFilters(prev => ({ ...prev, status: newStatus }));
  }, []);
  const handleQueryChange = useCallback((newQuery: string) => {
    setFilters(prev => ({ ...prev, query: newQuery }));
  }, []);

  const handleSelectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const preparedTodos = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return todos.filter(todo => {
      const newStatus =
        filters.status === StatusState.All ||
        (filters.status === StatusState.Active && !todo.completed) ||
        (filters.status === StatusState.Completed && todo.completed);

      const newQuery =
        normalizedQuery === '' ||
        todo.title.toLowerCase().includes(normalizedQuery);

      return newStatus && newQuery;
    });
  }, [todos, filters.status, filters.query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filters={filters}
                onStatusChange={handleStatusChange}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  selectedId={selectedTodo?.id}
                  onTodoEyeClick={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onModalClose={handleCloseModal} />
      )}
    </>
  );
};
