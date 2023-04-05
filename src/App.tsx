import React, {
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
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';
import { getTodos } from './api';
import { getVisibleTodos } from './utils/getVisibleTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodoId, setActiveTodoId] = useState(0);
  const [sortType, setSortType] = useState(SortType.All);
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getTodosFromServer();
  }, []);

  const activeTodo = useMemo(() => (
    todos.find(({ id }) => id === activeTodoId)
  ), [activeTodoId]);

  const changeActiveTodo = useCallback((id: number) => {
    setActiveTodoId(id);
  }, []);

  const visibleTodos = getVisibleTodos(todos, sortType, query);
  const shouldDisplayTodoList = todos.length > 0 && !isError && !isLoading;

  return (
    <>
      <div className="columns is-flex is-justify-content-center">
        <div className="column is-two-thirds m-6">
          <div className="panel is-info">
            <h1 className="title panel-heading">Todos:</h1>

            <div className="panel-block is-flex is-justify-content-center">
              <TodoFilter
                query={query}
                onChangeSortType={setSortType}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="panel-block is-flex is-justify-content-center">
              {isLoading && !isError && (
                <Loader />
              )}

              {isError && !isLoading && (
                <p>Eror has happened...</p>
              )}

              {shouldDisplayTodoList && (
                <TodoList
                  todos={visibleTodos}
                  activeId={activeTodoId}
                  onActivateTodo={changeActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          todo={activeTodo}
          onClose={() => changeActiveTodo(0)}
        />
      )}
    </>
  );
};
