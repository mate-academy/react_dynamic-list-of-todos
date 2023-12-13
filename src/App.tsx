/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import type { Todo } from './types/Todo';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(StatusFilter.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(
    () => {
      getTodos()
        .then(setTodos)
        .catch(error => error.message)
        .finally(() => setIsLoading(false));
    },
    [],
  );

  const todosToRender = useMemo(() => todos.filter(todo => {
    let hasToBeRendered = true;

    switch (statusFilter) {
      case StatusFilter.ALL:
        break;

      case StatusFilter.ACTIVE:
        hasToBeRendered = !todo.completed;
        break;

      case StatusFilter.COMPLETED:
        hasToBeRendered = todo.completed;
        break;

      default:
        break;
    }

    if (hasToBeRendered && searchQuery) {
      const preparedQuery = searchQuery.trim().toLowerCase();
      const preparedTitle = todo.title.toLowerCase();

      hasToBeRendered = preparedTitle.includes(preparedQuery);
    }

    return hasToBeRendered;
  }), [todos, searchQuery, statusFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                status={statusFilter}
                setStatus={setStatusFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={todosToRender}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            onClose={() => setSelectedTodo(null)}
          />
        )}
    </>
  );
};
