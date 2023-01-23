import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import './App.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isTodoError, setIsTodoError] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then((loadedTodos) => setTodos(loadedTodos))
      .catch(() => setIsTodoError(true))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const unselectedUser = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  }, [query, todos]);

  const selectedTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectedTodoId);
  }, [selectedTodoId, todos]);

  const isNoFiltersResult = query && !visibleTodos.length;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isTodosLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelect={setSelectedTodoId}
                  />
                )}

              {isTodoError && (
                <p>Something went wrong</p>
              )}

              {isNoFiltersResult && (
                <p>No totd matched your filters</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && <TodoModal todo={selectedTodo} onClose={unselectedUser} />}
    </>
  );
};
