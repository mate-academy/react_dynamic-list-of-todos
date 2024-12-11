/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectedTodo, setIsSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const getFilteredTodos = () =>
    todos.filter(todo => {
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && !todo.completed) ||
        (filterStatus === 'completed' && todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                currentStatus={filterStatus}
                onFilterChange={setFilterStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {!isLoading && todos.length > 0 ? (
                <TodoList
                  todos={getFilteredTodos()}
                  selectedTodo={isSelectedTodo}
                  setSelectedTodo={setIsSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {isSelectedTodo && (
        <TodoModal
          todo={isSelectedTodo}
          onClose={() => setIsSelectedTodo(null)}
        />
      )}
    </>
  );
};
