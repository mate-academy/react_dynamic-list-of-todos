/* eslint-disable max-len */
import React, { useLayoutEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { ITodoFilter, Todo } from './types/Todo';
import { getTodos } from './api';
import { getFiltredTodo } from './utils/filterTodo';
import { DEFAULT_FILTER_STATE } from './constants/TodoFilter';

export const App: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setselectedTodo] = useState<null | Todo>(null);
  const [todosFilter, setTodosFilter] =
    useState<ITodoFilter>(DEFAULT_FILTER_STATE);

  const filtredTodos = useMemo(
    () => getFiltredTodo(todos, todosFilter),
    [todosFilter, todos],
  );

  useLayoutEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch((e: Error) => {
        // eslint-disable-next-line no-console
        console.log(e.message);
      });
  }, []);

  const closeModal = () => setselectedTodo(null);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTodosFilter={setTodosFilter}
                todosFilter={todosFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!!filtredTodos.length && (
                <TodoList
                  todos={filtredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedUser={setselectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
