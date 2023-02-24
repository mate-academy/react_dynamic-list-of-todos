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
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { filterTodos } from './components/functions';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<Todo | null>(null);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [query, setQuery] = useState('');
  const [filtredByReady, setFiltredByReady] = useState<Filter>(Filter.All);

  const selectedTodo = useCallback((todo: Todo) => {
    setSelectedTodoId(todo);
  }, []);

  const fetchTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoadingError(false);
    } catch {
      setIsLoadingError(true);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, filtredByReady, query);
  }, [todos, query, filtredByReady]);

  const selectTodo = useCallback((todo: Todo) => {
    setSelectedTodoId(todo);
  }, []);

  const onClose = useCallback(() => {
    setSelectedTodoId(null);
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                ready={filtredByReady}
                onStatusChange={setFiltredByReady}
                query={query}
                onInputChange={setQuery}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={selectTodo}
                  selectedTodoId={selectedTodoId}
                />
              ) : (
                <>
                  {isLoadingError && <span> No todos from server</span>}
                  <Loader />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todo={selectedTodoId}
          onClose={onClose}
        />
      )}
    </>
  );
};
