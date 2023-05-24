/* eslint-disable max-len */
import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { LoadingError } from './components/LoaderError/LoadingError';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        setHasLoadingError(true);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const filterTodos = useCallback((
    todosArg: Todo[],
    queryArg: string,
    filterByArg: FilterBy,
  ) => {
    let filteredTodos = [...todosArg];

    if (queryArg) {
      filteredTodos = filteredTodos.filter(todo => (
        todo.title.toLocaleLowerCase().includes(queryArg.toLocaleLowerCase())
      ));
    }

    switch (filterByArg) {
      case FilterBy.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      case FilterBy.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      default:
        break;
    }

    return filteredTodos;
  }, []);

  const visibleTodos = useMemo(() => filterTodos(todos, query, filterBy), [todos, query, filterBy]);

  const handleSelectedTodo = (todo: Todo) => {
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
                statusFilter={filterBy}
                onStatusFilterChange={setFilterBy}
              />
            </div>

            <div className="block">
              {loading
                ? (
                  <Loader />
                )
                : (
                  <>
                    {visibleTodos.length > 0
                      ? (
                        <TodoList
                          todos={visibleTodos}
                          selectedTodo={selectedTodo}
                          onTodoSelected={handleSelectedTodo}
                        />
                      )
                      : (
                        <p>
                          Not found any todos
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

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleModalCloseButtonClick}
        />
      )}
    </>
  );
};
