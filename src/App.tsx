import {
  FC,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { getFilteredTodos } from './helpers/helpers';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filterType, query);
  }, [todos, filterType, query]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        setTodos(await getTodos());
        setIsLoading(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={query}
                filterTypeValue={filterType}
                onFilterType={setFilterType}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p style={{ color: 'red' }}>
                      Error. Something went wrong.
                    </p>
                  )}

                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectTodo={handleSelectTodo}
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
