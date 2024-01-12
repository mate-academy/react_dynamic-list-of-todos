/* eslint-disable max-len */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { StateContext } from './store/Store';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentTodo, status, query } = useContext(StateContext);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(
    () => (
      todosFromServer.filter(({ completed }: Todo) => {
        switch (status) {
          case Status.Active:
            return !completed;
          case Status.Completed:
            return completed;
          default:
            return true;
        }
      })
        .filter(({ title }: Todo) => (title.toLowerCase()
          .includes(query.toLowerCase())))),
    [status, todosFromServer, query],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} />
      )}
    </>
  );
};
