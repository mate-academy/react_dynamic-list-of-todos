/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<'all' | 'completed' | 'active'>('all');
  const [query, setQuery] = useState('');

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setModal(true);
  };

  function onClose() {
    setModal(false);
    setSelectedTodo(null);
  }

  const visibleTodos = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-shadow
      todos: Todo[],
      {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        query,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        status,
      }: { query: string; status: 'all' | 'completed' | 'active' },
    ) => {
      let preparedTodos = todos;
      const normalizedQuery = query.trim().toLowerCase();

      if (normalizedQuery) {
        preparedTodos = preparedTodos.filter((todo: { title: string }) =>
          todo.title.toLowerCase().includes(normalizedQuery),
        );
      }

      if (status === 'active') {
        preparedTodos = preparedTodos.filter(
          (todo: { completed: boolean }) => todo.completed === false,
        );
      }

      if (status === 'completed') {
        preparedTodos = preparedTodos.filter(
          (todo: { completed: boolean }) => todo.completed === true,
        );
      }

      return preparedTodos;
    },
    [todos, query, status],
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
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

            {!loading && error && (
              <div className="notification is-danger">{error}</div>
            )}

            <div className="block">
              {loading && <Loader />}
              {!loading && !error && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos(todos, { query, status })}
                  onShow={openModal}
                  selectedTodo={selectedTodo}
                />
              )}
              {!loading && !error && todos.length === 0 && (
                <p className="title is-5">There are no todos</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal modal={modal} selectedTodo={selectedTodo} onClose={onClose} />
    </>
  );
};
