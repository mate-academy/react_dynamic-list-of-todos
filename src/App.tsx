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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status>('all');
  const [filterQuery, setFilterQuery] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setLoadError(null);

    getTodos()
      .then(todosFromServer => {
        if (isMounted) {
          setTodos(todosFromServer);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTodos([]);
          setLoadError('Failed to load the todo list. Please try again.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedTodo && !todos.some(todo => todo.id === selectedTodo.id)) {
      setSelectedTodo(null);
    }
  }, [todos, selectedTodo]);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (filterStatus === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    if (filterStatus === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    const normalizedQuery = filterQuery.trim().toLowerCase();

    if (normalizedQuery) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return result;
  }, [todos, filterStatus, filterQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={setFilterStatus}
                onQueryChange={setFilterQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && loadError && (
                <p className="has-text-danger">{loadError}</p>
              )}
              {!loading && !loadError && filteredTodos.length === 0 && (
                <p className="has-text-grey">There are no todos to show.</p>
              )}
              {!loading && !loadError && filteredTodos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id ?? null}
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
