/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { LoadingError } from './components/LoadingError';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  const loadTodos = async () => {
    setIsLoading(true);

    try {
      let todosFromServer = await getTodos();

      if (query) {
        todosFromServer = todosFromServer.filter(todo => (
          todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        ));
      }

      switch (filterBy) {
        case 'completed':
          todosFromServer = todosFromServer.filter(todo => (
            todo.completed
          ));
          break;

        case 'active':
          todosFromServer = todosFromServer.filter(todo => (
            !todo.completed
          ));
          break;

        default:
          break;
      }

      setTodos(todosFromServer);
    } catch (error) {
      setHasLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [query, filterBy]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalCloseButtonClick = () => {
    setSelectedTodo(null);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleQueryReset = () => {
    setQuery('');
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.currentTarget.value as FilterBy);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={handleQueryChange}
                onQueryReset={handleQueryReset}
                filterBy={filterBy}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                )
                : (
                  <>
                    {todos.length > 0
                      ? (
                        <TodoList
                          todos={todos}
                          onTodoSelect={handleTodoSelect}
                          selectedTodo={selectedTodo}
                        />
                      )
                      : (
                        <p>
                          No todos found
                        </p>
                      )}

                    {hasLoadingError && (
                      <LoadingError />
                    )}
                  </>
                )}

            </div>
          </div>
        </div>
      </div>

      { selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleModalCloseButtonClick}
        />
      )}
    </>
  );
};
