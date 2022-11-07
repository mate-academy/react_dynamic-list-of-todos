import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { debounce } from 'lodash';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/FilterBy';

const getFilteredTodos = (todos: Todo[], filerBy: FilterBy, query: string) => {
  const filteredTodos = todos.filter(({ title }) => (
    title.toLowerCase().includes(query)
  ));

  switch (filerBy) {
    case FilterBy.ACTIVE:
      return filteredTodos.filter(({ completed }) => !completed);

    case FilterBy.COMPLETED:
      return filteredTodos.filter(({ completed }) => completed);

    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [appliedqQuery, setAppliedQuery] = useState('');
  const [filerBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      let todosFromApi;

      try {
        todosFromApi = await getTodos();
      } catch (error) {
        setHasLoadingError(true);

        return;
      }

      setTodos(todosFromApi);
      setIsLoaded(true);
    };

    loadTodos();
  }, []);

  const selectTodo = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const resetSelectedTodo = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const selectFilterType = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterBy(event.target.value as FilterBy);
  }, []);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const setVisibleAndAppliedQuery = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
    applyQuery(event.target.value.toLowerCase());
  }, []);

  const resetQuery = useCallback(() => {
    setQuery('');
  }, []);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filerBy, appliedqQuery);
  }, [todos, filerBy, appliedqQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectFilterType={selectFilterType}
                setVisibleAndAppliedQuery={setVisibleAndAppliedQuery}
                resetQuery={resetQuery}

              />
            </div>

            <div className="block">
              {!hasLoadingError && (
                isLoaded ? (
                  <TodoList
                    todos={visibleTodos}
                    onClick={selectTodo}
                    selectedTodo={selectedTodo}
                  />
                ) : <Loader />
              )}

              {hasLoadingError && (
                <span style={{ color: 'red' }}>
                  Todos not found
                </span>
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClick={resetSelectedTodo}
        />
      )}

    </>
  );
};
