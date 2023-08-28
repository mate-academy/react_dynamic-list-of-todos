/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.All);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Something went wrong while fetching data.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    return todos.filter(todo => {
      const isCompleted = status === Status.Completed ? todo.completed : true;
      const isActive = status === Status.Active ? !todo.completed : true;
      const isMatchQuery = todo.title.toLowerCase().includes(lowerQuery);

      return isCompleted && isActive && isMatchQuery;
    });
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>
            <div className="block">
              {isLoading && (<Loader />)}
              {error && (<div className="notification is-danger">{error}</div>)}
              {!isLoading && !error && (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelected={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          close={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
