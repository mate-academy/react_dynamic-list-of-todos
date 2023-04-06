/* eslint-disable max-len */
import {
  FC,
  useCallback,
  useEffect,
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
import { TodoStatus } from './types/TodoStatus';
import { prepareTodos } from './helpers/helpers';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.ALL);
  const [hasError, setHasError] = useState(false);

  const loadTodos = useCallback(async () => {
    setLoading(true);
    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    } catch (error) {
      setHasError(true);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = prepareTodos(todos, todoStatus, query);

  const currentTodo = visibleTodos.find(todo => todo.id === selectedTodoId) || null;

  const handleCloseModal = () => {
    setSelectedTodoId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {hasError ? (
              <p className="has-text-danger">An error occurred when loading data</p>
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter
                    query={query}
                    setQuery={setQuery}
                    setTodoStatus={setTodoStatus}
                  />
                </div>

                <div className="block">
                  {loading ? (
                    <Loader />
                  ) : (
                    <TodoList
                      todos={visibleTodos}
                      selectedTodoId={selectedTodoId}
                      setSelectedTodoId={setSelectedTodoId}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
