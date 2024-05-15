/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { ToDoContext } from './components/TodoContext';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [modalState, setModalState] = useState<Todo | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [user, setUser] = useState<User>({} as User);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleModalButton = (todo: Todo | null) => {
    setModalState(todo);
  };

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
                <TodoList
                  modalButton={handleModalButton}
                  modal={modalState}
                  setLoading={setLoader}
                  todos={todos}
                  setTodos={setTodos}
                />
              </div>
            </div>
          </div>
        </div>

        {modalState && (
          <TodoModal
            closeButton={handleModalButton}
            loading={loader}
            setLoading={setLoader}
            modalState={modalState}
            setUserData={setUser}
            userData={user}
          />
        )}
      </ToDoContext>
    </>
  );
};
