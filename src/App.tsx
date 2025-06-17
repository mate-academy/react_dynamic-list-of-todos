/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import type { Todo } from './types/Todo';

import { useState, useEffect } from 'react';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filtered, setFiltered] = useState<Todo[]>([]);
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);

  useEffect(() => {
    (async () => {
      const todosFromServer = await getTodos();

      setAllTodos(todosFromServer);
      setFiltered(todosFromServer);
    })();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={allTodos} setTodos={setFiltered} />
            </div>

            <div className="block">
              {filtered.length > 0 ? (
                <TodoList
                  todos={filtered}
                  setModalTodo={setModalTodo}
                  modalTodo={modalTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalTodo === null ? null : (
        <TodoModal
          openedModal={modalTodo}
          setOpenedModal={setModalTodo}
        />
      )}
    </>
  );
};
