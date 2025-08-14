/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { Todo } from './types/Todo';

export enum StatusFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.All,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const loadedTodos = await getTodos();

        setError(null);

        setTodos(loadedTodos);
      } catch (e) {
        setError('Failed to load todos!');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleModalOpen = (todo: Todo) => {
    if (todo) {
      setSelectedTodo(todo);
    }

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const handleOnChange = (inputValue: string) => {
    setQuery(inputValue);
  };

  const handleOnClear = () => {
    setQuery('');
  };

  const handleStatusChange = (newStatus: StatusFilter) => {
    setStatusFilter(newStatus);
  };

  const visibleTodos = todos.filter(todo => {
    const queryFilter = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    let matchesStatus = true;

    switch (statusFilter) {
      case StatusFilter.Active:
        matchesStatus = !todo.completed;
        break;
      case StatusFilter.Completed:
        matchesStatus = todo.completed;
        break;
      default:
        break;
    }

    return queryFilter && matchesStatus;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChange={handleOnChange}
                onClear={handleOnClear}
                defaultStatus={statusFilter}
                statusFilter={StatusFilter}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  openModal={handleModalOpen}
                  selectedTodo={selectedTodo}
                />
              )}
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TodoModal onClick={handleModalClose} todo={selectedTodo} />
      )}
    </>
  );
};
