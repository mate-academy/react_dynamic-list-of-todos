/* eslint-disable max-len */
import {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Error } from './components/Error';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { getTodos } from './api';
import { getFilteredTodos } from './helpers';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setselectedTodo] = useState<Todo | null>(null);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filterType, query);
  }, [todos, filterType, query]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setHasError(true);
      }

      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleSelectedTodo = useCallback((todo: Todo | null) => {
    setselectedTodo(todo);
  }, [selectedTodo]);

  const handleCloseModal = useCallback(() => {
    setselectedTodo(null);
  }, [selectedTodo]);

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
                filterType={filterType}
                onFilterChange={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {hasError && (
                    <Error />
                  )}

                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelect={handleSelectedTodo}
                  />
                </>
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
