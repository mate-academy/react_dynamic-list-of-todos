/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { useTodos } from './hooks/useTodos';
import { StatusFilter } from './components/TodoFilter';
import { getFilteredTodos } from './getFilteredTodos';
export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const todosQuery = useTodos();

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleSetFilter = (statusFilter: StatusFilter) => {
    setStatus(statusFilter);
  };

  const filteredTodos = getFilteredTodos(todosQuery.data, { query, status });

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
                onFilter={handleSetFilter}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {todosQuery.isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={handleCloseModal}
          selectedTodo={selectedTodo}
          isLoading={todosQuery.isLoading}
        />
      )}
    </>
  );
};
