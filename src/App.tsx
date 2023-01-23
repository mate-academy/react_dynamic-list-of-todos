/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [complitedFilter, setComplitedFilter] = useState<string>('all');

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = searchQuery.toLowerCase().trim();
      const isQueryMatched = normalizedTitle.includes(normalizedQuery);

      let isFilterBySelectMatched = null;

      switch (complitedFilter) {
        case 'active':
          isFilterBySelectMatched = !todo.completed;
          break;

        case 'completed':
          isFilterBySelectMatched = todo.completed;
          break;

        default:
          isFilterBySelectMatched = true;
          break;
      }

      return isQueryMatched && isFilterBySelectMatched;
    })
  ), [todos, complitedFilter, searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todo => {
        return setTodos(todo);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onCloseModal = useCallback(() => setSelectedTodoId(0), []);
  const onSelectTodo = useCallback((id: number) => setSelectedTodoId(id), []);
  const setQuery = useCallback((value: string) => setSearchQuery(value), []);
  const setFilter = useCallback((value: string) => setComplitedFilter(value), []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [todos, selectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                setQuery={setQuery}
                filter={complitedFilter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodo={onSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          onClose={onCloseModal}
          selectedTodo={selectedTodo}
        />
      )}

    </>
  );
};
