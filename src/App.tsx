import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

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

    switch (
      filters.completed // Completed.All === 'All'
    ) {
      case Completed.Active:
        filtered = filtered.filter(todo => !todo.completed);
        break;

      case Completed.Completed:
        filtered = filtered.filter(todo => todo.completed);
        break;
      case Completed.All: // break => do nothing
        break;
      default:
        break;
    }

    // !''
    if (filters.search) {
      // 'delectus'
      const search = filters.search.toLowerCase(); // 'delectus'.toLowerCase()

      filtered = filtered.filter(todo => {
        const title = todo.title.toLowerCase(); // 'delectus aut autem'.toLowerCase()

        return title.includes(search); // 'delectus aut autem'.includes('delectus');
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
