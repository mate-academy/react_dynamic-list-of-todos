/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './style.scss';
import 'bulma/css/bulma.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SearchType } from './types/filter-type';
import { setRequestedTodos } from './components/helpers/helpers';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo []>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [compleatedFilter, setCompletedFilter] = useState<SearchType>(SearchType.all);

  const selectedTodo = todosFromServer.find(({ id }) => id === selectedTodoId) || null;

  const closeModal = useCallback(() => setSelectedTodoId(null), []);
  const selectTodo = useCallback((id: number) => setSelectedTodoId(id), []);

  const todosFilteredBySelect = useMemo(
    () => {
      switch (compleatedFilter) {
        case SearchType.active:
          return todosFromServer.filter(({ completed }) => !completed);
        case SearchType.completed:
          return todosFromServer.filter(({ completed }) => completed);
        default:
          return [...todosFromServer];
      }
    }, [compleatedFilter, todosFromServer],
  );

  const requestedTodos = setRequestedTodos(todosFilteredBySelect, searchQuery);

  const hasFilters = searchQuery !== '' || compleatedFilter !== SearchType.all;

  const clearAllFilters = () => {
    setSearchQuery('');
    setCompletedFilter(SearchType.all);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                completedFilter={compleatedFilter}
                setCompletedFilter={setCompletedFilter}
                hasFilters={hasFilters}
                onClear={clearAllFilters}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && (
                <TodoList
                  selectedTodoId={selectedTodoId}
                  todos={requestedTodos}
                  onSelectTodo={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={closeModal}
        />
      )}
    </>
  );
};
