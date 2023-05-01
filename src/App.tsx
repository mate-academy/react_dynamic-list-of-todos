import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { SelectFilter } from './types/SelectFilter';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState<SelectFilter>(
    SelectFilter.ALL,
  );
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);

    try {
      const responseTodos = await getTodos();

      setTodos(responseTodos);
    } catch (error) {
      setErrorMessage('Something went wrong...');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const showModal = useCallback((todo: Todo) => {
    setSelectedTodoId(todo.id);
  }, []);

  const hideModal = () => {
    setSelectedTodoId(0);
  };

  const resetSearchQuery = useCallback(() => {
    setSearchQuery('');
  }, []);

  const selectedTodo = todos.find((todo) => todo.id === selectedTodoId) || null;

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      const checkIsInclude = todo.title.toLocaleLowerCase().includes(
        searchQuery.toLocaleLowerCase(),
      );

      switch (selectFilter) {
        case SelectFilter.ALL:
          return checkIsInclude;

        case SelectFilter.ACTIVE:
          return !todo.completed && checkIsInclude;

        case SelectFilter.COMPLETED:
          return todo.completed && checkIsInclude;

        default:
          throw new Error('Invalid filter query');
      }
    });
  }, [todos, searchQuery, selectFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                setQuery={setSearchQuery}
                reset={resetSearchQuery}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            <div className="block">
              {errorMessage && <div>{errorMessage}</div>}
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onShow={showModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todo={selectedTodo}
          onClose={hideModal}
        />
      )}
    </>
  );
};
