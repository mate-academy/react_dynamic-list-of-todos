/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>(
    FilterStatus.all,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    let filtered = todos;

    if (statusFilter === FilterStatus.active) {
      filtered = filtered.filter(
        currentTodo => currentTodo.completed === false,
      );
    } else if (statusFilter === FilterStatus.completed) {
      filtered = filtered.filter(currentTodo => currentTodo.completed === true);
    }

    if (searchQuery) {
      filtered = filtered.filter(currentTodo =>
        currentTodo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [todos, statusFilter, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                searchQuery={searchQuery}
                onSetStatusFilter={setStatusFilter}
                onSetSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
