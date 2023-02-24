import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { debounce } from 'lodash';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { FilterType } from './types/FilterType';
import { getVisibleTodos } from './utils/getVisibleTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
        setHasError(true);
      }

      setIsLoading(false);
    };

    fetchAllTodos();
  }, []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const filteredTodos = useMemo(() => (
    getVisibleTodos(todos, filterType, appliedQuery)
  ),
  [todos, filterType, appliedQuery]);

  const changeFilterType = useCallback((type: FilterType) => {
    setFilterType(type);
  }, []);

  const changeSelectedTodo = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={changeFilterType}
                onApplyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {
                isLoading
                  ? <Loader />
                  : (
                    <TodoList
                      todos={filteredTodos}
                      selectedTodo={selectedTodo}
                      onSelectedTodo={changeSelectedTodo}
                    />
                  )
              }
              {hasError && (
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
          onSelectedTodo={changeSelectedTodo}
        />
      )}
    </>
  );
};
