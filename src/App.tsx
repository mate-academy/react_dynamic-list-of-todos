/* eslint-disable max-len */
import {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './libs/types/Todo';
import { getTodos } from './api';
import { Filters } from './libs/enums';
import { getPreparedTodos } from './libs/helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Filters.All);

  const visibleTodos = useMemo(
    () => getPreparedTodos(todos, { filter, query }),
    [filter, query, todos],
  );

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelectTodo = useCallback((todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleDeselectTodo = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleSelectFilter = useCallback((selectedFilter) => {
    setFilter(selectedFilter);
  }, []);

  const handleEnterQuery = useCallback((enteredQuery) => {
    setQuery(enteredQuery);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectFilter={handleSelectFilter}
                onEnterQuery={handleEnterQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedId={selectedTodo?.id}
                onSelect={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleDeselectTodo}
        />
      )}
    </>
  );
};
