/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { StatusState } from './types/StatusState';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusState>(StatusState.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(prev => (prev?.id === todo.id ? null : todo));
  };

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        statusFilter === StatusState.All
          ? true
          : statusFilter === StatusState.Completed
          ? todo.completed
          : !todo.completed;

      const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [todos, statusFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={statusFilter}
                onStatusChange={setStatusFilter}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedId={selectedTodo?.id}
                  onTodoSelect={handleTodoSelect}
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
