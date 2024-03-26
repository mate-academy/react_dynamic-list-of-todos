/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filrer';

export const App: React.FC = React.memo(() => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const lowerQuery = query.toLowerCase().trim();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setLoading(false));
  }, [setTodos]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleQueryDelete = () => {
    setQuery('');
  };

  const filterTodos = useCallback(
    (currentTodos: Todo[], currentFilter: string) => {
      if (currentFilter === Filter.Active) {
        return currentTodos.filter((todo: Todo) => !todo.completed);
      } else if (currentFilter === Filter.Completed) {
        return currentTodos.filter((todo: Todo) => todo.completed);
      } else {
        return currentTodos;
      }
    },
    [],
  );

  const filteredTodos = filterTodos(todos, filter);

  const visibleTodos = useMemo(() => {
    return filteredTodos.filter((todo: Todo) =>
      todo.title.toLowerCase().includes(lowerQuery),
    );
  }, [filteredTodos, lowerQuery]);

  const handleSelectTodo = (currentTodo: Todo) => {
    setSelectedTodo(currentTodo);
  };

  const reset = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                onFilterChange={handleFilterChange}
                onQueryChange={handleQueryChange}
                onQueryDelete={handleQueryDelete}
              />
            </div>

            <div className="block">
              {loading && <Loader data-cy="loader" />}
              {!loading && visibleTodos.length > 0 && (
                <TodoList
                  selectedTodo={selectedTodo}
                  onSelectTodo={handleSelectTodo}
                  todos={visibleTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onReset={reset}
          userId={selectedTodo.userId}
          todo={selectedTodo}
        />
      )}
    </>
  );
});

App.displayName = 'App';
