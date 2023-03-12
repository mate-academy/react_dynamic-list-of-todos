import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { useSortAndSearch } from './hooks/useSortAndSearch';
import { LoadingError } from './components/LoadingError';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState({ sort: 'All', query: '' });
  const [hasLoadingError, setHasLoadingError] = useState(false);

  async function fetchTodos() {
    setIsLoading(true);
    setHasLoadingError(false);
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoading(false);
    } catch (error) {
      setHasLoadingError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const openTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeTodo = () => {
    setSelectedTodo(null);
  };

  const sortedAndSearchedTodos = useSortAndSearch(
    todos,
    filter.sort,
    filter.query,
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            {hasLoadingError
              ? <LoadingError />
              : (
                <div className="block">
                  {isLoading
                    ? <Loader />
                    : (
                      <TodoList
                        todos={sortedAndSearchedTodos}
                        selectedTodo={selectedTodo}
                        openTodo={openTodo}
                      />
                    )}
                </div>
              )}

            {selectedTodo
            && (
              <TodoModal
                selectedTodo={selectedTodo}
                closeTodo={closeTodo}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
