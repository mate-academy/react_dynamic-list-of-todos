/* eslint-disable no-alert */
/* eslint-disable max-len */
import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { SelectFilter } from './types/SelectFilter';
import { getFiltredToDos } from './utils/helper';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState<SelectFilter>(SelectFilter.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Unexpected error';

      alert(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const resetQuery = useCallback(() => {
    setQuery('');
  }, []);

  const showModal = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
    },
    [],
  );

  const hideModal = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = useMemo(() => {
    return getFiltredToDos(todos, selectFilter, query);
  }, [selectFilter, query, todos]);

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
                reset={resetQuery}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onClick={showModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={hideModal} />
      )}
    </>
  );
};
