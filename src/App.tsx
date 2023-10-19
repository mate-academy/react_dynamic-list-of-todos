/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilter';
import { getTodos } from './api';
import { getPreparedTodos } from './services/todos';
// import { getPreparedTodos } from './services/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(TodosFilter.All);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return getPreparedTodos(todos, query, filter);
  }, [todos, query, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                filter={filter}
                onFilterChange={setFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onSelectTodo={setSelectedTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectTodo={setSelectedTodo}
        />
      )}

    </>
  );
};
