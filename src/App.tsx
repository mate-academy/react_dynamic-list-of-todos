import React, {
  useCallback, useEffect, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { SortType } from './types/Sort';
import { getTodos } from './api';
import { getFilteredTodos } from './utils/helpers';
import { DEFAULT_TODO_ID } from './utils/constants';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState(SortType.ALL);
  const [selectedTodoById, setSelectedTodoById] = useState(DEFAULT_TODO_ID);

  const visibleTodos = getFilteredTodos(todos, sortType, query);

  const fetchTodos = async () => {
    setIsLoading(true);

    try {
      const getAllTodos = await getTodos();

      setTodos(getAllTodos);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const selectedTodo = todos
    .find(({ id }) => id === selectedTodoById);

  const handleSelectedTodo = useCallback((id: number) => {
    setSelectedTodoById(id);
  }, []);

  const handleCloseModal = () => {
    setSelectedTodoById(DEFAULT_TODO_ID);
  };

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
                && <Loader />}

              {error
                && (
                  <p style={{
                    color: 'darkred',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                  >
                    Error: Unable to establish a connection with the server.
                  </p>
                )}

              {!isLoading && !error && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoById={selectedTodoById}
                  handleSelectedTodo={handleSelectedTodo}
                />
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
