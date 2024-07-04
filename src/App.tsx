/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Completed, Filters } from './types/filters';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<Filters>({
    completed: Completed.All,
    search: '',
  });

  const handlerFiltersChange = (
    key: keyof Filters,
    value: string | Completed,
  ) => {
    setFilters(curentState => ({
      ...curentState,
      [key]: value,
    }));
  };

  const filterTodos = useMemo(() => {
    let filtered = todos;

    if (filters.completed !== Completed.All) {
      switch (filters.completed) {
        case Completed.Active:
          filtered = filtered.filter(todo => !todo.completed);
          break;
        case Completed.Completed:
          filtered = filtered.filter(todo => todo.completed);
          break;
      }
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

  const handleClose = () => {
    setSelectTodo(null);
  };

  const handleOpen = (todo: Todo) => {
    setSelectTodo(todo);
  };

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
              <TodoFilter onFilter={handlerFiltersChange} filters={filters} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos}
                  onOpen={handleOpen}
                  selectedTodoId={selectTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && <TodoModal todo={selectTodo} onClose={handleClose} />}
    </>
  );
};
