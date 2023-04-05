import {
  FC,
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
import { getTodos } from './api';
import { getFilteredTodos } from './helpers/helpers';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const visibleTodos = getFilteredTodos(todos, filterType, query);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectTodo = useCallback((id: number) => {
    setSelectedTodoId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={query}
                filterTypeValue={filterType}
                onChangeFilterType={setFilterType}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p style={{ color: 'red' }}>
                      Error. Something went wrong.
                    </p>
                  )}

                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelectTodo={handleSelectTodo}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
