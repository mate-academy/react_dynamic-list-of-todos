/* eslint-disable max-len */
import React, { useState, useMemo, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

function getPreparedTodos(todoList: Todo[], select: Status, query: string) {
  const visibleTodos = [...todoList];

  return visibleTodos
    .filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (select) {
        case Status.Active:
          return !completed;

        case Status.Completed:
          return completed;

        default:
          return visibleTodos;
      }
    });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return getPreparedTodos(todos, filter, query);
  }, [todos, filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length && (
                <TodoList
                  todos={visibleTodos}
                  modalInfo={modalInfo}
                  setModalInfo={setModalInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalInfo && (
        <TodoModal modalInfo={modalInfo} setModalInfo={setModalInfo} />
      )}
    </>
  );
};
