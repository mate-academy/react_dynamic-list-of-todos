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

interface FilterOptions {
  query: string;
  filterState: boolean | null;
}

function getPreparedToDosList(
  todos: Todo[] | [],
  { query, filterState }: FilterOptions,
) {
  let preparedToDos = todos;
  const changedQuery = query.toLowerCase().trim().replace(/\s+/g, ' ');

  if (query) {
    preparedToDos = todos.filter(todo =>
      todo.title.toLowerCase().includes(changedQuery),
    );
  }

  if (filterState !== null) {
    preparedToDos = preparedToDos.filter(
      todo => todo.completed === filterState,
    );
  }

  return preparedToDos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterState, setFilterState] = useState<boolean | null>(null);
  const [selectedToDo, setSelectedToDo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(preparedTodos => setTodos(preparedTodos))
      .catch(() => {
        setErrorMessage('Try again later');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredToDos = useMemo(() => {
    return getPreparedToDosList(todos, { query, filterState });
  }, [todos, filterState, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {/* Show error message if it exists */}
            {errorMessage && (
              <div className="notification is-danger" data-cy="errorMessage">
                {errorMessage}
              </div>
            )}

            <div className="block">
              <TodoFilter
                onFilterState={setFilterState}
                onQueryChange={setQuery}
                query={query}
                onReset={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredToDos || []}
                  selectedToDo={selectedToDo}
                  onFocus={setSelectedToDo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedToDo && (
        <TodoModal todo={selectedToDo} onFocus={setSelectedToDo} />
      )}
    </>
  );
};
