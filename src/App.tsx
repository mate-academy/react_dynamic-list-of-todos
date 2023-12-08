/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosError, setTodosError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(FilterStatus.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const filteringTodos: Todo[] = useMemo(() => {
    let filteredTodos = [...todos];

    if (query) {
      const normalizeQuery = query.trim().toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(normalizeQuery));
    }

    switch (selectedStatus) {
      case FilterStatus.ACTIVE:
        return filteredTodos.filter(todo => todo.completed === false);
        break;
      case FilterStatus.COMPLETED:
        return filteredTodos.filter(todo => todo.completed === true);
        break;

      default:
        return filteredTodos;
    }
  }, [todos, query, selectedStatus]);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((error) => setTodosError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

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
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteringTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}

              {todosError && (
                <p>{todosError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
