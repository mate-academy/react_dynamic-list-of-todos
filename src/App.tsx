/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { FilterValue, TodosFilter } from './types/TodoFilter';
import { filterByQuery, filterByStatus } from './utils/filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const [todoFilterValue, setTodoFilterValue] = useState<string>('');
  const [todoStatusFilter, setTodoStatusFilter] = useState<FilterValue>(
    TodosFilter.ALL,
  );

  const handleSelectTodo = useCallback((todo: Todo | undefined) => {
    setSelectedTodo(todo);
  }, []);

  const handleFilterQueryChange = useCallback((value: string) => {
    setTodoFilterValue(value);
  }, []);

  const handleFilterStatusChange = useCallback((status: FilterValue) => {
    setTodoStatusFilter(status);
  }, []);

  const visibleTodos = useMemo(() => {
    const statusFiltered = filterByStatus(todos, todoStatusFilter);

    return filterByQuery(statusFiltered, todoFilterValue);
  }, [todoFilterValue, todos, todoStatusFilter]);

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(err => setErrorMessage(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={handleFilterQueryChange}
                filterValue={todoFilterValue}
                onStatusChange={handleFilterStatusChange}
                statusValue={todoStatusFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : errorMessage ? (
                <p className="has-text-danger">{errorMessage}</p>
              ) : todos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleSelectTodo}
                  selectedId={selectedTodo?.id}
                />
              ) : (
                <p>There are no todos yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal onClose={handleSelectTodo} todo={selectedTodo} />
      )}
    </>
  );
};
