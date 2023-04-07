import {
  FC,
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
import { FilterType } from './types/FilterType.enum';

const getVisibleTodos = (
  todos: Todo[],
  filterType: FilterType,
  query: string,
): Todo[] => {
  let categoryFiltered = todos;

  if (filterType === FilterType.ACTIVE) {
    categoryFiltered = todos.filter(todo => !todo.completed);
  }

  if (filterType === FilterType.COMPLETED) {
    categoryFiltered = todos.filter(todo => todo.completed);
  }

  return categoryFiltered.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));
};

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [query, setQuery] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const newTodos = await getTodos();

        setTodos(newTodos);
      } catch {
        setHasError(true);
      } finally {
        setIsLoaded(true);
      }
    };

    getTodosFromServer();
  }, []);

  const handleSetActiveTodo = useCallback((id: number): void => {
    const newActiveTodo = todos.find(todo => todo.id === id);

    setActiveTodo(newActiveTodo || null);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, filterType, query);
  }, [todos, filterType, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSelectChange={setFilterType}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {!isLoaded && (
                <Loader />
              )}

              {todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  activeId={activeTodo?.id}
                  setActiveId={handleSetActiveTodo}
                />
              )}
            </div>

            {hasError && (
              <div className="notification is-danger">
                Something went wrong! Impossible to load todos.
              </div>
            )}
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal todo={activeTodo} onClose={() => handleSetActiveTodo(0)} />
      )}
    </>
  );
};
