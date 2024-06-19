import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const loadTodos = async () => {
    setIsLoading(true);
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
    setIsLoading(false);
  };

  const filterTodos = () => {
    let filtered = todos;

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (statusFilter !== 'all') {
      const isCompleted = statusFilter === 'completed';

      filtered = filtered.filter(todo => todo.completed === isCompleted);
    }

    setFilteredTodos(filtered);
  };
  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [todos, query, statusFilter]);

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodoId(todo.id);
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
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
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodoId={selectedTodoId} // Передаємо новий стан
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
