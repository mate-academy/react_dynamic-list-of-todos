/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { StatusFilter, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useTodos } from './useTodos';
import { Todo } from './types/Todo';
import { useFilteredTodos } from './useFilteredTodos';

export const App: React.FC = () => {
  const { todos, isLoading } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [titleFilter, setTitleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const displayTodos = useFilteredTodos(todos, titleFilter, statusFilter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                titleFilter={titleFilter}
                handleTitleFilterChange={setTitleFilter}
                statusFilter={statusFilter}
                handleStatusFilterChange={setStatusFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={displayTodos}
                  handleSelectTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {
        selectedTodo !== null && (
          <TodoModal
            selectedTodo={selectedTodo}
            handleClose={() => setSelectedTodo(null)}
          />
        )
      }
    </>
  );
};
