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
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({ status: 'all', query: '' });
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (filters.status === 'active') {
          return !todo.completed;
        }

        if (filters.status === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(filters.query.toLowerCase()),
      );
  }, [todos, filters.status, filters.query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filters.status}
                query={filters.query}
                onStatusChange={s =>
                  setFilters(prev => ({ ...prev, status: s }))
                }
                onQueryChange={q => setFilters(prev => ({ ...prev, query: q }))}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodoId={selectedTodo?.id ?? null}
                  todo={visibleTodos}
                  onShow={todo => setSelectedTodo(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo ? (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      ) : (
        <></>
      )}
    </>
  );
};
