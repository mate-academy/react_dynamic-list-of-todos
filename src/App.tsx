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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status >(Status.All);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedUser, setClickedUser] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => new Error('Try again later'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    const filterTodos = todos.filter(todo => {
      const preperedTodo = todo.title.toLowerCase();
      const preperedQuery = query.toLowerCase();

      return preperedTodo.includes(preperedQuery);
    });

    switch (status) {
      case Status.All:
        return filterTodos;
      case Status.Active:
        return filterTodos.filter(todo => todo.completed === false);
      case Status.Completed:
        return filterTodos.filter(todo => todo.completed === true);
      default:
        return filterTodos;
    }
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                setStatus={setStatus}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              {!isLoading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  setClickedUser={setClickedUser}
                  clickedUser={clickedUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {clickedUser && (
        <TodoModal
          clickedUser={clickedUser}
          setClickedUser={setClickedUser}
        />
      )}
    </>
  );
};
