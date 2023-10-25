/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodosFilter } from './types/TodoFilter';
import { getpreparedTodos } from './utils/PreparedTodos';

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<TodosFilter>(TodosFilter.All);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodo)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const preparedTodos = useMemo(() => {
    return getpreparedTodos(todos, query, filter);
  }, [todos, query, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={query}
                onQueryChange={setQuery}
                selectedFilter={filter}
                onFilterChange={setFilter}
              />
            </div>

            <div className="block">

              {isLoading && (
                <Loader />
              )}

              {!isLoading && !!todos.length && (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  onSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelect={setSelectedTodo}
        />
      )}
    </>
  );
};
