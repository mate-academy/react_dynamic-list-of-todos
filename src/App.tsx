/* eslint-disable max-len */
import React, { useCallback, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useFetchState } from './utils/useFetchState';

type Filter = {
  completedStatus: 'all' | 'active' | 'completed';
  query: string;
};

export const App: React.FC = () => {
  const [todos, , fetchStatus, reload] = useFetchState<Todo[]>([], getTodos);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(-1);
  const [filter, setFilter] = useState<Filter>({
    completedStatus: 'all',
    query: '',
  });

  const removeTodoSelection = useCallback(() => {
    setSelectedTodoId(-1);
  }, [setSelectedTodoId]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      let satisfiesCompleted: boolean;

      switch (filter.completedStatus) {
        case 'active':
          satisfiesCompleted = !todo.completed;
          break;
        case 'completed':
          satisfiesCompleted = todo.completed;
          break;
        default:
          satisfiesCompleted = true;
          break;
      }

      return (
        satisfiesCompleted &&
        todo.title.toLowerCase().includes(filter.query.toLowerCase())
      );
    });
  }, [todos, filter]);

  const selectedTodo = useMemo(() => {
    return selectedTodoId >= 0
      ? todos.find(todo => todo.id === selectedTodoId)
      : null;
  }, [todos, selectedTodoId]);

  const handleStatusSelect = useCallback(
    (status: Filter['completedStatus']) => {
      setFilter(current => ({ ...current, completedStatus: status }));
    },
    [setFilter],
  );

  const handleQueryChange = useCallback(
    (query: string) => {
      setFilter(current => ({ ...current, query: query }));
    },
    [setFilter],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={filter.completedStatus}
                onStatusSelect={handleStatusSelect}
                query={filter.query}
                onQueryChange={handleQueryChange}
              />
            </div>

            {fetchStatus.loading && !fetchStatus.errorText && <Loader />}

            {fetchStatus.errorText && (
              <span className="has-background-danger">
                Error: {fetchStatus.errorText}{' '}
                <button onClick={reload}>Try again</button>
              </span>
            )}

            {(!!todos.length ||
              (!fetchStatus.loading && !fetchStatus.errorText)) && (
              <TodoList
                todos={filteredTodos}
                selectedId={selectedTodoId}
                onSelect={setSelectedTodoId}
                onReset={removeTodoSelection}
              />
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={removeTodoSelection} />
      )}
    </>
  );
};
