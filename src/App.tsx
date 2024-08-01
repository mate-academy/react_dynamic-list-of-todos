// #region imports
/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { CompletedStatus } from './types/CompletedStatus';

import { getTodos } from './api';
import { getFilteredTodos } from './services/getFilteredTodos';
// #endregion

export const App: React.FC = () => {
  // #region states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [completedStatus, setCompletedStatus] = useState<CompletedStatus>(
    CompletedStatus.All,
  );
  const [query, setQuery] = useState('');
  // #endregion

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const selectedTodo = useMemo(
    () => todos.find(todo => todo.id === selectedId),
    [todos, selectedId],
  ) as Todo;

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, completedStatus, query),
    [todos, completedStatus, query],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                completedStatus={completedStatus}
                onSelect={setCompletedStatus}
                query={query}
                onChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedId && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
};
