/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

enum FilterBy {
  All = 'All',
  COMPLETED = 'Completed',
  ACTIVE = 'Active',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<FilterBy>(FilterBy.All);
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const loadTodos = async () => {
    setIsLoading(true);
    try {
      const response = await getTodos();

      setTodos(response);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const handleFilterChange = useCallback((selectedFilter) => {
    setFilter(selectedFilter);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleTodoSelect = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter) {
        case FilterBy.All:
          return true;
        case FilterBy.COMPLETED:
          return todo.completed;
        case FilterBy.ACTIVE:
          return !todo.completed;
        default:
          return false;
      }
    }).filter((todo) => {
      const title = todo.title.toLowerCase();
      const queryLower = query.toLowerCase();

      return title.includes(queryLower);
    });
  }, [todos, filter, query]);

  return (
    <>
      {
        hasError
          ? (<p> Something wrong</p>)
          : (
            <>
              <div className="section">
                <div className="container">
                  <div className="box">
                    <h1 className="title">Todos:</h1>

                    <div className="block">
                      <TodoFilter
                        query={query}
                        filter={filter}
                        onQueryChange={handleQueryChange}
                        onFilterChange={handleFilterChange}
                      />
                    </div>

                    <div className="block">
                      {isLoading
                        ? <Loader />
                        : (
                          <TodoList
                            visibleTodos={visibleTodos}
                            onSelectedTodo={handleTodoSelect}
                            selectedTodo={selectedTodo}
                          />
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {selectedTodo && (
                <TodoModal
                  selectedTodo={selectedTodo}
                  onClose={handleModalClose}
                />
              )}
            </>
          )
      }
    </>
  );
};
