/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useEffect, useMemo, useState } from 'react';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery = normalizedTitle.includes(normalizedQuery);

      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelectTodo={todo => {
                    setSelectedTodo(current =>
                      current?.id === todo.id ? null : todo,
                    );
                  }}
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
