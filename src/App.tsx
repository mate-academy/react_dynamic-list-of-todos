import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { debounce } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(0);

  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    try {
      getTodos()
        .then(setTodos);
    } catch (error) {
      setTodos([]);
    }
  }, []);

  const debouncedCallback = useCallback(
    debounce(setDebouncedQuery, 400),
    [],
  );

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    debouncedCallback(value);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const title = todo.title.toLowerCase();
      const lowerQuery = debouncedQuery.toLowerCase().trim();
      const isTitleIncludesQuery = title.includes(lowerQuery);

      switch (filterStatus) {
        case 'completed':
          return todo.completed && isTitleIncludesQuery;

        case 'active':
          return !todo.completed && isTitleIncludesQuery;

        default:
          return isTitleIncludesQuery;
      }
    });
  }, [todos, filterStatus, debouncedQuery]);

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
                query={query}
                filterStatus={filterStatus}
                onInputChange={handleInputChange}
                onSelectChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {visibleTodos.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodoIdChange={setSelectedTodoId}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodoIdChange={setSelectedTodoId}
        />
      )}
    </>
  );
};
