/* eslint-disable max-len */
import React, { useState, useMemo, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Completed, Filters } from './types/Filters';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    completed: Completed.All,
  });

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleOpen = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleFiltersChange = (
    key: keyof Filters,
    value: string | Completed,
  ) => {
    setFilters(currentState => ({
      ...currentState,
      [key]: value,
    }));
  };

  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    switch (filters.completed) {
      case Completed.Active:
        filtered = filtered.filter(todo => !todo.completed);
        break;

      case Completed.Completed:
        filtered = filtered.filter(todo => todo.completed);
        break;

      case Completed.All:
        break;
      default:
        break;
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();

      filtered = filtered.filter(todo => {
        const title = todo.title.toLowerCase();

        return title.includes(search);
      });
    }

    return filtered;
  }, [todos, filters]);

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
              <TodoFilter onFilter={handleFiltersChange} filters={filters} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onOpen={handleOpen}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={handleClose} />}
    </>
  );
};
