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
import { filterTodos } from './helpers';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(result => {
        setTodosFromServer(result);
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = filter !== Filters.All || query
    ? filterTodos(todosFromServer, filter, query)
    : todosFromServer;

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === Filters.All
      || event.target.value === Filters.Completed
      || event.target.value === Filters.Active) {
      setFilter(event.target.value);
    }
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryClear = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onQueryChange={handleQueryChange}
                onQueryClear={handleQueryClear}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onTodoSelect={handleTodoSelect}
                    selectedTodoId={selectedTodo?.id || null}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
