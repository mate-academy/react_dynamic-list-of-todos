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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.All);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try Again Later'))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos
    .filter((todo) => {
      switch (status) {
        case Status.All:
          return true;
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return true;
      }
    })
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                search={search}
                onStatusChange={setStatus}
                onSearchChange={setSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {errorMessage && (
                <div>{errorMessage}</div>
              )}

              {!loading && !errorMessage && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
