import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, Filters, Status } from './types';

const getFilteredTodos = (todos: Todo[], filters: Filters) => {
  let filteredTodos = [...todos];
  const { status, query } = filters;

  if (query) {
    filteredTodos = filteredTodos.filter((todo) => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  if (status === Status.Active) {
    filteredTodos = filteredTodos.filter((todo) => todo.completed === false);
  }

  if (status === Status.Completed) {
    filteredTodos = filteredTodos.filter((todo) => todo.completed === true);
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: Status.All,
    query: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getTodos()
      .then(setTodos)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleTodos = getFilteredTodos(todos, filters);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {error && (
                <p className="notification is-danger">
                  Something went wrong...
                </p>
              )}

              {!loading && !error && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onTodoSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
