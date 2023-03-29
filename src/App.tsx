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
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filters } from './helpers';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState(Filters.All);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const filteredTodos = useMemo(
    () => todos.filter(todo => {
      const { completed, title } = todo;
      const queryFilter = query === ''
        || title.toLowerCase().includes(query);
      let groupFilter;

      switch (filterBy) {
        case Filters.Active:
          groupFilter = !completed;
          break;
        case Filters.Completed:
          groupFilter = completed;
          break;
        default:
          groupFilter = true;
      }

      return queryFilter && groupFilter;
    }),
    [filterBy, todos, query],
  );

  const loadTodosFromServer = useCallback(async () => {
    try {
      const result = await getTodos();

      setTodos(result);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {error && <h2>{error}</h2>}

              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    handleSelectTodo={handleSelectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
