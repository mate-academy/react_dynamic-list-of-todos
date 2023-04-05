import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getFilteredTodos } from './utils/helpers';
import { ALL, DEFAULT_TODO_ID } from './utils/constants';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState(ALL);
  const [selectedTodoById, setSelectedTodoById] = useState(DEFAULT_TODO_ID);

  const visibleTodos = getFilteredTodos(todos, sortType, query);

  const fetchTodos = async () => {
    setIsLoading(true);

    try {
      setTodos(await getTodos());
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const selectedTodo = useMemo(() => (
    todos.find(({ id }): boolean => id === selectedTodoById)
  ), [selectedTodoById]);

  const handleSelectedTodo = useCallback((id: number) => {
    setSelectedTodoById(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodoById(DEFAULT_TODO_ID);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                onChangeFilterType={setSortType}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {error && (
                      <p style={{ color: 'darkred' }}>
                        Error: Unable to establish a connection with the server.
                      </p>
                    )}

                    <TodoList
                      todos={visibleTodos}
                      selectedTodoById={selectedTodoById}
                      handleSelectedTodo={handleSelectedTodo}
                    />
                  </>
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          handleCloseModal={handleCloseModal}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
