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

function getPreparedTodo(todoList: Todo[], select: Status, query: string) {
  const visibleTodos = [...todoList];

  return visibleTodos
    .filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (select) {
        case Status.active:
          return !completed;

        case Status.completed:
          return completed;

        default:
          return visibleTodos;
      }
    });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState(Status.all);
  const [searchTodos, setSearchTodos] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return getPreparedTodo(todos, filterTodos, searchTodos);
  }, [filterTodos, searchTodos, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodos={filterTodos}
                setFilterTodos={setFilterTodos}
                searchTodos={searchTodos}
                setSearchTodos={setSearchTodos}
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
