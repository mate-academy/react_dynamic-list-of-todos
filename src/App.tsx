/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterTypes';

export function getFilteredTodos(
  todos: Todo[],
  filterType: FilterType,
  query: string,
) {
  let visibleTodos = [...todos];

  switch (filterType) {
    case FilterType.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case FilterType.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    case FilterType.ALL:
    default:
      break;
  }

  return visibleTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<FilterType>(FilterType.ALL);

  const [isLoading, setIsLoading] = useState(false);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [hasTodosError, setHasTodosError] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
        setIsTodosLoaded(true);
      } catch (error) {
        setHasTodosError(`Oppps smth went wrong, error: ${error}`);
        setIsLoading(false);
      } finally {
        setIsLoading(true);
      }
    };

    fetchTodos();
  }, []);

  const handleQuery = useCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    [],
  );

  const handleClearQuery = useCallback(
    (value: string) => {
      setSearchQuery(value);
      setSortBy(FilterType.ALL);
    },
    [],
  );

  const handleSortBy = useCallback(
    (value: FilterType) => {
      setSortBy(value);
    },
    [],
  );

  const handleSelectDoto = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
    },
    [],
  );

  const visibleTodos = useMemo(() => getFilteredTodos(
    todos,
    sortBy,
    searchQuery,
  ), [
    todos,
    sortBy,
    searchQuery,
  ]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortBy={sortBy}
                handleSortBy={handleSortBy}
                searchQuery={searchQuery}
                handleQuery={handleQuery}
                handleClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {!isLoading && <Loader />}
              {hasTodosError && <span>{hasTodosError}</span>}
              {isTodosLoaded && (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={handleSelectDoto}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          seletedTodo={selectedTodo}
          onModalClose={setSelectedTodo}
        />
      )}
    </>
  );
};
