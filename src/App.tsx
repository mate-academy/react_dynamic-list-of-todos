/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filters, Select } from './types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    select: Select.All,
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOpen = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleFilters = (key: keyof Filters, value: string | Select) => {
    setFilters(currentState => ({
      ...currentState,
      [key]: value,
    }));
  };

  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    switch (filters.select) {
      case Select.Active:
        filtered = filtered.filter(todo => !todo.completed);
        break;

      case Select.Completed:
        filtered = filtered.filter(todo => todo.completed);
        break;

      case Select.All:
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

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={handleFilters} filters={filters} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onOpen={handleOpen}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal onClose={handleClose} todo={selectedTodo} />};
    </>
  );
};
