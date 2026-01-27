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
type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all'
        ? true
        : status === 'active'
          ? !todo.completed
          : todo.completed;

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesQuery && matchesStatus;
  });

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  onSelectTodo={setSelectedTodo}
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
    </>
  );
};
