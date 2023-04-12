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
import { Todo, FilterType } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const todo = await getTodos();

        setTodos(todo);
      } catch (error) {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setIsLoading(true);
      }
    };

    fetchData();
  }, [selectedTodo?.userId]);

  const filterTodo = useMemo(() => {
    return todos.filter(todo => {
      const todosFilter = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filterType) {
        case FilterType.ALL:
          return todosFilter;

        case FilterType.COMPLETE:
          return todo.completed && todosFilter;

        case FilterType.ACTIVE:
          return !todo.completed && todosFilter;

        default:
          return todosFilter;
      }
    });
  }, [query, todos, filterType]);

  const onChangeQuery = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const resetQuery = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={onChangeQuery}
                resetQuery={resetQuery}
                setFilterType={setFilterType}
                filterType={filterType}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <TodoList
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                    todos={filterTodo}
                  />
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
