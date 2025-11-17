/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setTodos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    let filtered = todos;

    if (status !== 'all') {
      filtered = filtered.filter(todo =>
        status === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, status, query]);

  const selectedTodo = useMemo(
    () => todos.find(todo => todo.id === selectedTodoId) || null,
    [todos, selectedTodoId],
  );

  const handleSelectTodo = useCallback((todoId: number | null) => {
    setSelectedTodoId(todoId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodoId(null);
  }, []);

  const handleClearQuery = useCallback(() => {
    setQuery('');
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
                onStatusChange={setStatus} // Функція для зміни статусу
                onQueryChange={setQuery} // Функція для зміни запиту
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
