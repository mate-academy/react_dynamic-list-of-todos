/* eslint-disable max-len */
import React, {
  useContext, useEffect, useMemo, useState,
}
  from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';
import { TodoContext } from './contexts/TodoContext';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const { selectedTodo } = useContext(TodoContext);

  const [isLoading, setIsLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);

    getTodos().then(setTodosFromServer);
  }, []);

  const filteredByQuery = useMemo(
    () => todosFromServer.filter((todo) => {
      const normalizedQuery = query.trim().toLowerCase();

      return todo.title.toLowerCase().includes(normalizedQuery);
    }),
    [query, todosFromServer],
  );

  const preparedTodos = useMemo(
    () => filteredByQuery.filter((todo) => {
      switch (status) {
        case Status.active:
          return !todo.completed;
        case Status.completed:
          return todo.completed;
        default:
          return todo;
      }
    }),
    [status, filteredByQuery],
  );

  return (
    <>
      <div className="section">
        <h1 className="title">Todos:</h1>

        <div className="block">
          <TodoFilter
            query={query}
            setQuery={setQuery}
            setStatus={setStatus}
          />
        </div>

        <div className="block">
          {isLoading && <Loader />}
          <TodoList todosFromServer={preparedTodos} />
        </div>
      </div>

      {selectedTodo.isSelected && (
        <TodoModal />
      )}
    </>
  );
};
