/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { TodoWithUser } from './types/TodoWithUser';
import { TodoCompletionFilter } from './types/TodoCompletionFilter';

import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [hasTotosLoadingError, setHasTodosLoadingError] = useState(false);
  const [isTodosLoadInitialized, setIsTodosLoadInitialized] = useState(false);

  const [selectedTodoWithUser, setSelectedTodoWithUser] = useState<null | TodoWithUser>(null);
  const [isTodoWithUserLoading, setIsTodoWithUserLoading] = useState(false);
  const [hasTodoWithUserLoadingError, setHasTodoWithUserLoadingError] = useState(false);
  const [isTodosWithUserLoadInitialized, setIsTodosWithUserLoadInitialized] = useState(false);

  const [todoCompletionFilterOption, setTodoCompletionFilterOption] = useState(TodoCompletionFilter.All);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsTodosLoading(true);
    setIsTodosLoadInitialized(true);

    getTodos()
      .then(setTodos)
      .catch(() => setHasTodosLoadingError(true))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const selectTodoWithUser = useCallback(
    (newSelectedTodo: Todo): void => {
      setHasTodoWithUserLoadingError(false);
      setIsTodoWithUserLoading(true);
      setIsTodosWithUserLoadInitialized(true);
      setSelectedTodoWithUser({
        ...newSelectedTodo,
        user: null,
      });

      getUser(newSelectedTodo.id)
        .then(user => setSelectedTodoWithUser({
          ...newSelectedTodo,
          user: { ...user },
        }))
        .catch(() => setHasTodoWithUserLoadingError(true))
        .finally(() => setIsTodoWithUserLoading(false));
    },
    [],
  );

  const unselectTodoWithUser = (): void => {
    setIsTodosWithUserLoadInitialized(false);
    setSelectedTodoWithUser(null);
  };

  const filteredTodos = useMemo(() => (
    todos
      .filter(todo => {
        switch (todoCompletionFilterOption) {
          case TodoCompletionFilter.Completed:
            return todo.completed;
          case TodoCompletionFilter.Active:
            return !todo.completed;
          default:
            return true;
        }
      })
      .filter(todo => todo.title.includes(searchQuery.trim()))
  ), [todos, todoCompletionFilterOption, searchQuery]);

  const isSuccessTodosLoad = !hasTotosLoadingError
    && !isTodosLoading
    && isTodosLoadInitialized;

  // console.log('render App');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todoCompletionFilterOption={todoCompletionFilterOption}
                setTodoCompletionFilterOption={setTodoCompletionFilterOption}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}

              {hasTotosLoadingError && (
                <article className="message is-danger">
                  <div className="message-body">
                    An error occured when loading todos
                  </div>
                </article>
              )}

              {isSuccessTodosLoad && !todos.length && (
                <p className="has-text-centered">
                  No todos were found
                </p>
              )}

              {isSuccessTodosLoad && Boolean(todos.length) && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoWithUser?.id ?? 0}
                  selectTodoWithUser={selectTodoWithUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isTodosWithUserLoadInitialized && (
        <TodoModal
          selectedTodoWithUser={selectedTodoWithUser}
          isTodoWithUserLoading={isTodoWithUserLoading}
          hasTodoWithUserLoadingError={hasTodoWithUserLoadingError}
          unselectTodoWithUser={unselectTodoWithUser}
        />
      )}
    </>
  );
};
