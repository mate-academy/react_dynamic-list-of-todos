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
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const FILTRATIONS: Record<FilterStatus, (todo: Todo) => boolean> =
    useMemo(() => {
      return {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
      };
    }, []);

  const handleModalClose = () => {
    setIsModalOpened(false);
    setSelectedTodo(null);
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpened(true);
  };

  const handleFilterReset = () => {
    setSearchQuery('');
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSelectedFilter(event.target.value as FilterStatus);
  };

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .finally(() => {
        setIsTodosLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    let filtered = todos.filter(FILTRATIONS[selectedFilter]);

    const normalized = searchQuery.toLowerCase().trim();

    if (searchQuery.length) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(normalized),
      );
    }

    return filtered;
  }, [todos, searchQuery, selectedFilter, FILTRATIONS]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                onQueryChange={handleQueryChange}
                onQueryReset={handleFilterReset}
                selectedFilter={selectedFilter}
                onSelectFilter={handleFilterSelect}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpened && selectedTodo && (
        <TodoModal onClose={handleModalClose} selectedTodo={selectedTodo} />
      )}
    </>
  );
};
