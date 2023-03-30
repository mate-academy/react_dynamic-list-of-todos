/* eslint-disable max-len */
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

const getVisibleTodos = (
  todos: Todo[],
  sortType: SortType,
  query: string,
): Todo[] => {
  let filtered = todos;

  if (sortType === SortType.Active) {
    filtered = todos.filter(todo => !todo.completed);
  }

  if (sortType === SortType.Completed) {
    filtered = todos.filter(todo => todo.completed);
  }

  return filtered.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodoId, setActiveTodoId] = useState(0);
  const [sortType, setSortType] = useState(SortType.All);
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setIsError(true);
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

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, sortType, query)
  ), [todos, sortType, query]);

  return (
    <>
      <div className="columns is-flex is-justify-content-center">
        <div className="column is-two-thirds m-6">
          <div className="panel is-info">
            <h1 className="title panel-heading">Todos:</h1>

            <div className="panel-block is-flex is-justify-content-center">
              <TodoFilter
                query={query}
                changeSortType={setSortType}
                changeQuery={setQuery}
              />
            </div>

            <div className="panel-block is-flex is-justify-content-center">
              {(todos.length && !isError)
                ? (
                  <TodoList
                    todos={visibleTodos}
                    activeId={activeTodoId}
                    setActiveId={changeActiveTodo}
                  />
                )
                : <Loader />}
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
