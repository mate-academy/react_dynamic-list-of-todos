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

export enum Type {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [showTodo, setShowTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Type>(Type.All);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const selectedTodoId = showTodo?.id ?? null;

  // загружаем задачи один раз
  useEffect(() => {
    getTodos()
      .then(setAllTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return allTodos.filter(todo => {
      const matchesFilter =
        filter === Type.All ||
        (filter === Type.Active && !todo.completed) ||
        (filter === Type.Completed && todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesFilter && matchesQuery;
    });
  }, [allTodos, filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={setFilter}
                query={query}
                onQueryChange={setQuery}
                filter={filter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={setShowTodo}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showTodo && <TodoModal todo={showTodo} onCloseModal={setShowTodo} />}
    </>
  );
};
