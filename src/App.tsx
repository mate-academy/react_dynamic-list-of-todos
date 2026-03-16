/* eslint-disable max-len */
import React, { useCallback, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');

  const handleSelect = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = React.useMemo(() => {
    return todos
      .filter(todo => {
        if (statusFilter === 'all') {
          return true;
        }

        if (statusFilter === 'completed') {
          return todo.completed;
        }

        return !todo.completed;
      })
      .filter(todo => {
        if (!query) {
          return true;
        }

        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
  }, [todos, statusFilter, query]);

  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
  }, []);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleStatusFilterChange={handleStatusFilterChange}
                onQueryChange={handleQueryChange}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodo?.id}
                handleSelectTodo={handleSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onModalClose={handleModalClose}
        />
      )}
    </>
  );
};
