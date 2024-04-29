/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export enum Filters {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [showDetails, setShowDetails] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filters>(Filters.all);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      switch (filter) {
        case Filters.all:
          return todo;
        case Filters.active:
          return !todo.completed;
        case Filters.completed:
          return todo.completed;
        default:
          return todo;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const handleQuery = (input: string) => setQuery(input);
  const handleFilter = (type: Filters) => setFilter(type);

  const handleDetails = (todo: Todo | null) => () => {
    setShowDetails(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={handleQuery}
                onFilterChange={handleFilter}
                query={query}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedId={showDetails?.id}
                  onModal={handleDetails}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <TodoModal handleClose={handleDetails} todo={showDetails} />
      )}
    </>
  );
};
