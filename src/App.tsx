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
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { debounce } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectFilterType, setSelectFilterType] = useState('all');
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const debouncedCallback = useCallback(
    debounce(setDebouncedQuery, 500),
    [],
  );

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    debouncedCallback(value);
  }, []);

  const visibleTodos = useMemo(() => todos.filter(todo => {
    const preparedQuery = debouncedQuery.toLowerCase().trim();
    const preparedTitle = todo.title.toLowerCase();
    const filteredTodos = preparedTitle.includes(preparedQuery);

    switch (selectFilterType) {
      case 'all':
        return filteredTodos;

      case 'active':
        return filteredTodos && !todo.completed;

      case 'completed':
        return filteredTodos && todo.completed;

      default:
        return true;
    }
  }), [debouncedQuery, todos, selectFilterType]);

  const selectedTodo = useMemo(() => todos.find(todo => todo.id === todoId), [todoId]);
  const handleSelectTodo = useCallback((id: number) => setTodoId(id), []);
  const onCloseModal = useCallback(() => setTodoId(0), []);

  useEffect(() => {
    setIsTodoLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setIsError(true))
      .finally(() => setIsTodoLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectFilterType={selectFilterType}
                onChangeFilter={setSelectFilterType}
                onInputChange={handleInputChange}
              />
            </div>

            <div className="block">
              {isTodoLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={todoId}
                  selectTodo={handleSelectTodo}
                />
              )}
            </div>

            {isError && (
              <p>There is an error</p>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={onCloseModal} />
      )}
    </>
  );
};
