import {
  FC,
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
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterTypeEnum } from './types/filterType';

export const App: FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [areUsersLoaded, setAreUsersLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState<FilterTypeEnum>(
    FilterTypeEnum.all,
  );

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setAreUsersLoaded(true);
      })
      .catch(() => {
        setErrorMessage('something went wrong, try to reload the page');
      })
      .finally(() => setAreUsersLoaded(true));
  }, []);

  const debouncedSetAppliedQuery = useCallback(
    debounce(setAppliedQuery, 300),
    [],
  );

  const applyQuery = (queryToApply: string) => {
    setQuery(queryToApply);
    debouncedSetAppliedQuery(queryToApply);
  };

  const handleClean = useCallback(() => {
    setQuery('');
    debouncedSetAppliedQuery('');
  }, []);

  const handleTodoSelect = useCallback((id: number) => {
    setSelectedTodoId(id);
  }, [todosFromServer]);

  const getSelectedTodo = useCallback((id: number) => (
    todosFromServer.find(todo => todo.id === id) || null
  ), [selectedTodoId]);

  const handleTodoClose = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const visibleTodos = useMemo(() => {
    if (!filterType) {
      return todosFromServer;
    }

    return todosFromServer.filter(todo => {
      const condition1 = todo.title
        .toLowerCase()
        .includes(appliedQuery.toLowerCase());

      switch (filterType) {
        case FilterTypeEnum.all:
          return condition1;
        case FilterTypeEnum.active:
          return condition1 && !todo.completed;
        case FilterTypeEnum.completed:
          return condition1 && todo.completed;
        default:
          return true;
      }
    });
  }, [todosFromServer, filterType, appliedQuery]);

  const shouldTodosBeRendered = areUsersLoaded && !errorMessage;

  const shouldErrorMessageBeRendered = errorMessage;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                query={query}
                onFilter={setFilterType}
                onSearch={applyQuery}
                onClean={handleClean}
              />
            </div>

            <div className="block">
              {
                !areUsersLoaded && (
                  <Loader />
                )
              }

              {
                shouldTodosBeRendered && (
                  <TodoList
                    todos={visibleTodos}
                    onSelect={handleTodoSelect}
                    selectedId={selectedTodoId}
                  />
                )
              }

              {
                shouldErrorMessageBeRendered && (
                  <h1
                    className="title"
                    style={{ textAlign: 'center', color: 'red' }}
                  >
                    {errorMessage}
                  </h1>
                )
              }
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodoId && (
        <TodoModal
          selectedTodo={getSelectedTodo(selectedTodoId)}
          onClose={handleTodoClose}
        />
      )}
    </>
  );
};
