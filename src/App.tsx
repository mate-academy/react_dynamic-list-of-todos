import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { Todo } from './types/Todo';
import { FilterByStatus } from './types/FilterByStatus';
import { filterTodos } from './components/utils/handlers';

export const App: React.FC = () => {
  const [todos, setTods] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasError, setHasError] = useState('');

  const [
    filterByStatus,
    setFilterByStatus,
  ] = useState<FilterByStatus>(FilterByStatus.ALL);
  const [filterByQuery, setFilterByQuery] = useState('');

  const handlerFilterByQuery = (titleQuery: string) => {
    setFilterByQuery(titleQuery);
  };

  const handlerFilterByStatus = (selectedFilter: FilterByStatus) => {
    setFilterByStatus(selectedFilter);
  };

  const handlerTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handlerCloseModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTods(fetchedTodos);
        setIsLoaded(true);
      } catch {
        setHasError('Load data is failed. Try again later.');
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = filterTodos(todos, filterByStatus, filterByQuery);

  const isLoading = !isLoaded && !hasError;
  const hasLoadingError = !isLoaded && hasError;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={filterByStatus}
                onSelect={handlerFilterByStatus}
                queryFilter={filterByQuery}
                onQueryInput={handlerFilterByQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {hasLoadingError && (
                <p className="has-text-danger">
                  {hasError}
                </p>
              )}

              {isLoaded && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={handlerTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handlerCloseModal}
        />
      )}
    </>
  );
};
