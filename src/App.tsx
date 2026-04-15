/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const handleShowTodoModal = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleCloseTodoModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      switch (filterStatus) {
        case 'active':
          return matchesQuery && !todo.completed;

        case 'completed':
          return matchesQuery && todo.completed;

        default:
          return matchesQuery;
      }
    });
  }, [query, filterStatus, todos]);

  useEffect(() => {
    setError('');
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch((er: Error) => setError(er.message || 'Something went wrong!'))
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
                onChange={setQuery}
                value={query}
                filterStatus={filterStatus}
                onChangeFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {error ? (
                <p className="notification is-danger">{error}</p>
              ) : (
                <>
                  {loading && <Loader />}
                  {!loading && filteredTodos.length > 0 && (
                    <TodoList
                      todos={filteredTodos}
                      onShowTodoModal={handleShowTodoModal}
                      selectedTodo={selectedTodo}
                    />
                  )}
                  {!loading && filteredTodos.length === 0 && (
                    <p className="title">There are no todos</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onCloseTodoModal={handleCloseTodoModal}
        />
      )}
    </>
  );
};
