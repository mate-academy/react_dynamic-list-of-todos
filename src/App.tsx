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
import { FilterType } from './types/FilterTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterType.All);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let prepareTodos = [...todos];

    if (query.trim()) {
      prepareTodos = prepareTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (filterStatus) {
      case FilterType.All:
        return prepareTodos;

      case FilterType.Completed:
        return prepareTodos.filter(todo => todo.completed);

      case FilterType.Active:
        return prepareTodos.filter(todo => !todo.completed);

      default:
        return prepareTodos;
    }
  }, [todos, query, filterStatus]);

  const onSelect = (
    todo: Todo,
  ) => {
    setSelectedTodo(todo);
  };

  const onClose = () => {
    setSelectedTodo(null);
  };

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleQuery={handleQuery}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && todos.length !== 0 && (
                <TodoList
                  todos={visibleTodos}
                  onSelect={onSelect}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={onClose} />
      )}
    </>
  );
};
