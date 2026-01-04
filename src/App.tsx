/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

type StatusType = 'all' | 'completed' | 'active';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusType>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(t =>
        statusFilter === 'all'
          ? true
          : statusFilter === 'completed'
            ? t.completed
            : !t.completed,
      )
      .filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, statusFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                status={statusFilter}
                onChangeStatus={setStatusFilter}
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && visibleTodos.length > 0 && (
                <TodoList
                  selectedTodo={selectedTodo}
                  todos={visibleTodos}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onSelectTodo={setSelectedTodo} />
      )}
    </>
  );
};
