import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TodoStatus } from './enums/TodoStatus';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { getFilteredTodos } from './helpers/getFilteredTodos';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(TodoStatus.All);
  const [currentTodoId, setCurrentTodoId] = useState(0);
  const [isListLoading, setIsListLoading] = useState(false);

  const loadTodos = useCallback(
    async () => {
      setIsListLoading(true);

      try {
        const receivedTodos = await getTodos().then();

        setTodos(receivedTodos);
      } catch (error) {
        setTodos([]);
      }

      setIsListLoading(false);
    },
    [getTodos],
  );

  const currentTodo = useMemo(
    () => todos.find(({ id }) => id === currentTodoId),
    [currentTodoId],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, status, query),
    [todos, status, query],
  );

  const closeModal = useCallback(
    () => setCurrentTodoId(0),
    [setCurrentTodoId],
  );

  return (
    <>
      <div className="columns is-flex is-justify-content-center">
        <div className="column is-two-thirds p-6">
          <div className="panel is-info">
            <h1 className="panel-heading">Todos:</h1>

            <div className="panel-block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChange={setQuery}
                onStatusChange={setStatus}
              />
            </div>

            <div className="panel-block">
              {isListLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={currentTodoId}
                  onTodoClick={setCurrentTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} onClose={closeModal} />
      )}
    </>
  );
};
