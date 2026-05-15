/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [viewTodoModal, setViewTodoModal] = useState<Todo | null>(null);

  const handleViewModal = (todo: Todo) => {
    setViewTodoModal(todo);
  };

  const handleCloseTodoModal = () => {
    setViewTodoModal(null);
  };

  const handleFilterChange = useCallback((filtered: Todo[]) => {
    setFilteredTodos(filtered);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} onFilterChange={handleFilterChange} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  handleViewModal={handleViewModal}
                  viewTodoModal={viewTodoModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {viewTodoModal && (
        <TodoModal
          todo={viewTodoModal}
          handleCloseTodoModal={handleCloseTodoModal}
        />
      )}
    </>
  );
};
