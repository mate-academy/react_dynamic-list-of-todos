/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, TodoSelect } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setAllTodos)
      .catch(() => {
        throw new Error('Failed to load todos:');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<TodoSelect>(
    TodoSelect.ALL,
  );

  const visibleTodos = useMemo<Todo[]>(() => {
    let filtered = (() => {
      switch (selectedFilter) {
        case TodoSelect.ACTIVE:
          return allTodos.filter(todo => !todo.completed);

        case TodoSelect.COMPLETED:
          return allTodos.filter(todo => todo.completed);

        case TodoSelect.ALL:
        default:
          return allTodos.slice();
      }
    })();

    if (searchQuery.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [selectedFilter, searchQuery, allTodos]);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleTodosFilter = (criteria: TodoSelect) => {
    setSelectedFilter(criteria);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
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
                onFilterSelect={handleTodosFilter}
                selectedFilter={selectedFilter}
                onSearch={handleSearch}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={handleSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
