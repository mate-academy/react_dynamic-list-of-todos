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

  const displayTodos = useMemo(() => todos.filter((todo) => {
    if (!todo.title.toLowerCase().includes(titleFilter.toLowerCase())) {
      return false;
    }

    if (statusFilter === 'active' && todo.completed) {
      return false;
    }

    if (statusFilter === 'completed' && !todo.completed) {
      return false;
    }

    return true;
  }), [titleFilter, statusFilter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter titleFilter={titleFilter} handleTitleFilterChange={setTitleFilter} statusFilter={statusFilter} handleStatusFilterChange={setStatusFilter} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading
              && <TodoList todos={displayTodos} handleSelectTodo={setSelectedTodo} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal selectedTodo={selectedTodo} handleClose={() => setSelectedTodo(null)} />}
    </>
  );
};
