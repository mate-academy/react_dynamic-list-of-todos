/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        filter === 'all' ||
        filter === '' ||
        (filter === 'active' && !todo.completed) ||
        (filter === 'completed' && todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, filter, query]);

  const selectedTodo = useMemo(
    () => todos.find(todo => todo.id === selectedTodoId) ?? null,
    [todos, selectedTodoId],
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsTodosLoading(false));
  }, []);

  const handleTodoSelect = (todoId: number) => {
    setSelectedTodoId(current => (current === todoId ? null : todoId));
  };

  const handleModalClose = () => {
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                onFilterChange={setFilter}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onTodoSelect={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
