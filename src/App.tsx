/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { ToDoContext } from './components/TodoContext';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [modalState, setModalState] = useState<Todo | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalButton, setModalButton] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(allTodos => setTodos(allTodos))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <ToDoContext>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                {loader ? (
                  <Loader />
                ) : (
                  <TodoList
                    modalState={value => setModalState(value)}
                    modalButton={value => setModalButton(value)}
                    todos={todos}
                    resultClick={modalButton}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <TodoModal
          modalState={modalState}
          modalButton={modalButton}
          handleClose={() => setModalButton(false)}
        />
      </ToDoContext>
    </>
  );
};
