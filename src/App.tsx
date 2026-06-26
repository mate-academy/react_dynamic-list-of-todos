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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [isTodosLoading, setIsTodosLoading] = useState(false);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(resultTodos => setTodos(resultTodos))
      .finally(() => setIsTodosLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
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
