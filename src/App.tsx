/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
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
import { Status } from './types/Status';
import { getTodos } from './api';
import { TodosContext } from './TodosContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [activeFilter, setActiveFilter] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(e => setErrorMessage(e.message))
      .finally(() => setIsLoading(false));
  }, [activeFilter, debouncedQuery]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearInterval(timerId);
  }, [query]);

  const filterByStatus = useCallback(todo => {
    switch (activeFilter) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      case Status.All:
      default:
        return true;
    }
  }, [activeFilter]);

  const filterByTitle = useCallback(todo => todo.title
    .toLowerCase()
    .includes(debouncedQuery.toLowerCase()), [debouncedQuery]);

  const filteredTodos = useMemo(() => todos
    .filter(todo => filterByStatus(todo))
    .filter(todo => filterByTitle(todo)),
  [todos]);

  const value = {
    todos: filteredTodos,
    selectedTodo,
    setSelectedTodo,
    setActiveFilter,
    query,
    setQuery,
  };

  return (
    <TodosContext.Provider value={value}>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && !errorMessage && todos.length > 0 && <TodoList />}

              {errorMessage && <p>{`Server responded with error: ${errorMessage}`}</p>}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </TodosContext.Provider>
  );
};
