import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { FilterType } from './types/FilterType';

const getVisibleTodos = (todos: Todo[], type: string, query: string) => {
  let preparedTodos = [...todos];

  if (query) {
    const lowerQuery = query.toLowerCase();

    preparedTodos = preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
  }

  preparedTodos = preparedTodos.filter(todo => {
    switch (type) {
      case FilterType.All:
        return true;
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        throw new Error('Filter type is incorrect');
    }
  });

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, hasIsError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoaded(true);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
        hasIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const filteredTodos = useMemo(() => (
    getVisibleTodos(todos, filterType, appliedQuery)
  ),
  [todos, filterType, appliedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={setFilterType}
                onApplyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {isLoaded && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={setSelectedTodo}
                />
              )}
              {isError && (
                <div className="notification is-danger has-text-centered">
                  <strong>An error occurred when loading todos</strong>
                </div>
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
