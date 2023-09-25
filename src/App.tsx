/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { StatusFilter, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useTodos } from './useTodos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const { todos, isLoading } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [titleFilter, setTitleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const displayTodos = useMemo(() => todos.filter(todo => {
    if (!todo.title.toLocaleLowerCase().includes(titleFilter.toLocaleLowerCase())) {
      return false;
    }

    switch (statusFilter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
    }

    return true;
  }),
  [todos, titleFilter, statusFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                titleFilter={titleFilter}
                statusFilter={statusFilter}
                handleTitleFilterChange={setTitleFilter}
                handleStatusFilterChange={setStatusFilter}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : (
                <TodoList
                  todos={displayTodos}
                  handleSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
