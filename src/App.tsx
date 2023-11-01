/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then((todosData) => {
        setTodos(todosData);
      })
      .catch(() => {})
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTodos={setTodos}
              />
            </div>

            <div className="block">
              {loader && !modal && <Loader />}
              {!loader && todos.length > 0 && (
                <TodoList
                  todos={todos}
                  setModal={setModal}
                  id={id}
                  setId={setId}
                  setLoader={setLoader}
                  setUserId={setUserId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <TodoModal
          todos={todos}
          setModal={setModal}
          id={id}
          setId={setId}
          loader={loader}
          setLoader={setLoader}
          userId={userId}
        />
      )}
    </>
  );
};
