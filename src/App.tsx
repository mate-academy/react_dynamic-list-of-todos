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
import { FilterType, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(FilterType.ALL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const newTodos = await getTodos();

        setTodos(newTodos);
      } catch (error) {
        Error('Can not load todos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onChangeQuery = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  const resetQuery = useCallback(() => {
    setQuery('');
  }, []);

  const filterTodo = useMemo(() => {
    return todos.filter(todo => {
      const todosFilter = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filterType) {
        case FilterType.ALL:
          return todosFilter;

        case FilterType.COMPLETED:
          return todo.completed && todosFilter;

        case FilterType.ACTIVE:
          return !todo.completed && todosFilter;

        default:
          return todosFilter;
      }
    });
  }, [query, todos, filterType]);

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
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodo}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
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
