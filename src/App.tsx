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
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const debounce = useCallback((f: (arg: string) => void, delay: number) => {
    let timerId: number;

    return (...args: string[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(f, delay, ...args);
    };
  }, []);

  const onSelect = useCallback(setSelectedTodo, []);

  const onStatusChange = useCallback(setStatus, []);

  const onQueryChange = useCallback(setQuery, []);

  const onAppliedQueryChange = useCallback(
    debounce(setAppliedQuery, 1000), [],
  );

  const onResetAppliedQueryChange = () => setAppliedQuery('');

  const filteredbyQuery = useMemo(() => todos.filter(todo => (
    todo.title.toLocaleLowerCase().includes(appliedQuery.toLocaleLowerCase().trim()))), [appliedQuery, todos]);

  const getVisibleTodos = useCallback(() => {
    enum Status {
      All = 'All',
      Active = 'active',
      Completed = 'completed',
    }

    switch (status) {
      case Status.Active:
        return filteredbyQuery.filter(todo => !todo.completed);

      case Status.Completed:
        return filteredbyQuery.filter(todo => todo.completed);

      case Status.All:
      default:
        return filteredbyQuery;
    }
  }, [appliedQuery, status, todos]);

  const visibleTodos = useMemo(() => getVisibleTodos(), [appliedQuery, status, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={onQueryChange}
                status={status}
                onStatusChange={onStatusChange}
                onAppliedQueryChange={onAppliedQueryChange}
                onResetAppliedQueryChange={onResetAppliedQueryChange}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onSelect={onSelect}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelect={onSelect}
        />
      )}
    </>
  );
};
