import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const loadTodos = async () => {
    setIsLoading(true);
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
    setIsLoading(false);
  };
  useEffect(() => {
    loadTodos();
  }, []);

  const getFilteredTodos = () => {
    let filtered = todos;

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (statusFilter !== FilterStatus.All) {
      const isCompleted = statusFilter === FilterStatus.Completed;

      filtered = filtered.filter(todo => todo.completed === isCompleted);
    }

    return filtered;
  };

  const handleFilterChange = (status: FilterStatus) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleSelectTodo = (todo: Todo) => {
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
              <TodoFilter
                statusFilter={statusFilter}
                onFilterChange={handleFilterChange}
                query={query}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={getFilteredTodos()}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
