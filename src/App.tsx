import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import debounce from 'lodash.debounce';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FILTERS } from './constants/filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState<boolean>(false);
  const [
    selectedInfoWindowId,
    setSelectedInfoWindowId,
  ] = useState<number | null>(null);
  const [sortCondition, setSortCondition] = useState(FILTERS.ALL);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const handleSortConditionChange = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSortCondition(event.target.value as FILTERS);
  }, []);

  const handleWindowOpen = useCallback((id: number) => {
    setIsInfoWindowOpen(true);
    setSelectedInfoWindowId(id);
  }, []);

  const handleWindowClose = useCallback(() => {
    setIsInfoWindowOpen(false);
  }, []);

  const getVisibleTodos = () => {
    let visibleTodos = [...todos];

    if (sortCondition === FILTERS.ACTIVE) {
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
    }

    if (sortCondition === FILTERS.COMPLETED) {
      visibleTodos = visibleTodos.filter(todo => todo.completed);
    }

    if (appliedQuery) {
      visibleTodos = visibleTodos.filter(todo => (
        todo.title.toLowerCase().includes(appliedQuery.toLowerCase().trim())
      ));
    }

    return visibleTodos;
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [todos, appliedQuery, sortCondition],
  );

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  const openTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectedInfoWindowId);
  }, [todos, selectedInfoWindowId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSortConditionChange={handleSortConditionChange}
                sortCondition={sortCondition}
                applyQuery={applyQuery}
              />
            </div>

            {isLoading && (
              <div className="block">
                <Loader />
              </div>
            )}

            {!isLoading && errorMessage && (
              <p style={{ color: 'red' }}>Todo list is empty</p>
            )}

            {!isLoading && !errorMessage && (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  onOpen={handleWindowOpen}
                  isOpen={isInfoWindowOpen}
                  selectedId={selectedInfoWindowId}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isInfoWindowOpen && openTodo && (
        <TodoModal
          todo={openTodo}
          onClose={handleWindowClose}
        />
      )}
    </>
  );
};
