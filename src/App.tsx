import React, {
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
import { ErrorMessage } from './components/ErrorMessage';

import { Todo } from './types/Todo';
import { TodoCompletionFilter } from './types/TodoCompletionFilter';

import { getTodos } from './api';

import { filterTodos } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [hasTodosLoadingError, setHasTodosLoadingError] = useState(false);
  const [isTodosLoadInitialized, setIsTodosLoadInitialized] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);

  const [todoCompletionFilterOption, setTodoCompletionFilterOption]
    = useState(TodoCompletionFilter.All);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsTodosLoading(true);
    setIsTodosLoadInitialized(true);

    getTodos()
      .then(setTodos)
      .catch(() => setHasTodosLoadingError(true))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const handleTodoSelect = (newTodo: Todo) => setSelectedTodo(newTodo);
  const handleTodoUnselect = (): void => setSelectedTodo(null);

  const filteredTodos = useMemo(() => (
    filterTodos(todos, todoCompletionFilterOption, searchQuery)
  ), [todos, todoCompletionFilterOption, searchQuery]);

  const isSuccessTodosLoad = !hasTodosLoadingError
    && !isTodosLoading
    && isTodosLoadInitialized;

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

              {hasTodosLoadingError && (
                <ErrorMessage message="An error occured when loading todos" />
              )}

              {isSuccessTodosLoad && !todos.length && (
                <p className="has-text-centered">
                  No todos were found
                </p>
              )}

              {isSuccessTodosLoad && Boolean(todos.length) && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id ?? 0}
                  onTodoWithUserSelect={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onTodoUnselect={handleTodoUnselect}
        />
      )}
    </>
  );
};
