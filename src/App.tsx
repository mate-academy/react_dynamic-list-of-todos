/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { filterTodos, findTodo } from './utils/functions';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.ALL);
  const [query, setQuery] = useState('');

  const loadTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setHasLoadingError(false);
    } catch {
      setHasLoadingError(true);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const shownTodo = findTodo(todos, selectedTodoId);

  const visibleTodos = filterTodos(todos, selectedStatus, query);

  const isLoadingFinished = (hasLoadingError && todos.length === 0) || todos.length;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={selectedStatus}
                onStatusChange={setSelectedStatus}
                query={query}
                onInputChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoadingFinished
                ? (
                  <TodoList
                    todos={visibleTodos}
                    onShowButtonClick={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : (
                  <Loader />
                )}

              {hasLoadingError && (
                <p className="has-text-danger">
                  Can&apos;t load data from server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          selectedTodo={shownTodo!}
          oncloseButtonClick={setSelectedTodoId}
        />
      )}
    </>
  );
};
