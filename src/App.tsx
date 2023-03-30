/* eslint-disable max-len */
import React, { useMemo, useEffect, useState } from 'react';
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
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (error) {
      setHasLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = [...todos];

    if (query) {
      filteredTodos = filteredTodos.filter(todo => (
        todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ));
    }

    switch (filterBy) {
      case FilterBy.Completed:
        filteredTodos = filteredTodos.filter(todo => (
          todo.completed
        ));
        break;

      case FilterBy.Active:
        filteredTodos = filteredTodos.filter(todo => (
          !todo.completed
        ));
        break;

      default:
        break;
    }

    return filteredTodos;
  }, [query, filterBy, isLoading]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalCloseButtonClick = () => {
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
                query={query}
                onQueryChange={setQuery}
                filterBy={filterBy}
                onFilterChange={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                )
                : (
                  <>
                    {visibleTodos.length > 0
                      ? (
                        <TodoList
                          todos={visibleTodos}
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
