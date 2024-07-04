/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useEffect } from 'react';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Completed, Filters } from './types/Completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    completed: Completed.All,
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const todosResponse = await getTodos();

        setTodos(todosResponse);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error('Error fetching todos');
      }
    };

    fetchInitialData();
  }, []);

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

  const handleFiltersChange = (
    key: keyof Filters,
    value: string | Completed,
  ) => {
    setFilters(currentState => ({
      ...currentState,
      [key]: value,
    }));
  };

  const handleOpenTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

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
                  onOpen={handleOpenTodo}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={handleCloseModal} />
      )}
    </>
  );
};
