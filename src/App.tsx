/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [normalizedQuery, setNormalizedQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const timerId = useRef(0);

  const handleQueryChange = useCallback((newQuery: string) => {
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setNormalizedQuery(newQuery.trim().toLowerCase());
    }, 1000);
  }, []);

  const filteredTodos = useMemo(() => {
    let result: Todo[] = [];

    switch (filter) {
      case 'all':
        result = [...todos];
        break;
      case 'active':
        result = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        result = todos.filter(todo => todo.completed);
        break;
    }

    return result.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery, todos, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={handleQueryChange}
                onFilterChange={setFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
