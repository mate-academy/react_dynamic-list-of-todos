/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useLoadedData } from './hooks/useLoadedData';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoStatus } from './types/TodoStatus';

interface Filters {
  query?: string;
  status: TodoStatus;
}

function getFilteredData(data: Todo[], { query, status }: Filters) {
  let filteredData = [...data];

  if (query) {
    filteredData = filteredData.filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  if (status !== 'all') {
    filteredData = filteredData.filter(todo => {
      return status === 'completed' ? todo.completed : !todo.completed;
    });
  }

  return filteredData;
}

export const App: React.FC = () => {
  const { data, error, handleLoadData, isLoading } = useLoadedData<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TodoStatus>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    handleLoadData(getTodos);
  }, []);

  const filteredData = useMemo(
    () => getFilteredData(data, { query, status }),
    [query, status, data],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(null);
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
                status={status}
                onChangeStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {error && <p>{error}</p>}
              {!error && !isLoading && (
                <TodoList
                  todos={filteredData}
                  onSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
