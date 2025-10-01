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
import { FilterTypes } from './types/FilterTypes';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTypes>(FilterTypes.all);
  const [query, setQuery] = useState('');
  const [showTodo, setShowTodo] = useState<Todo | null>(null);
  const selectedTodoId = showTodo?.id ?? null;

  const filteredTodos = useMemo(() => {
    return allTodos.filter(todo => {
      const matchesFilter =
        filter === FilterTypes.all ||
        (filter === FilterTypes.active && !todo.completed) ||
        (filter === FilterTypes.completed && todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesFilter && matchesQuery;
    });
  }, [allTodos, filter, query]);

  useEffect(() => {
    getTodos()
      .then(setAllTodos)
      .finally(() => setIsLoading(false));
  }, []);

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

      <TodoModal todo={showTodo} onCloseModal={setShowTodo} />
    </>
  );
};
