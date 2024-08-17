/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo, TodoStatusFilter } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TodoStatusFilter>(
    TodoStatusFilter.All,
  );
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsTodosLoading(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  const handleFilterChange = (status: TodoStatusFilter) => {
    setStatusFilter(status);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleQueryReset = () => {
    setQuery('');
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      let isStatusMatched = true;

      switch (statusFilter) {
        case TodoStatusFilter.Completed:
          isStatusMatched = todo.completed;
          break;
        case TodoStatusFilter.Active:
          isStatusMatched = !todo.completed;
          break;
        case TodoStatusFilter.All:
        default:
          isStatusMatched = true;
      }

      const isQueryMatched = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return isStatusMatched && isQueryMatched;
    });
  }, [statusFilter, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                query={query}
                onFilterChange={handleFilterChange}
                onQueryChange={handleQueryChange}
                onClearQuery={handleQueryReset}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseTodo} />
      )}
    </>
  );
};
