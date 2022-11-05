/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { UserContext } from './components/UserContext';
import { TodoContext } from './components/TodoContext';

export const App: React.FC = () => {
  const {
    selectedTodoId,
  } = useContext(UserContext);

  const {
    isLoaded,
    isError,
    getTodosFromServer,
  } = useContext(TodoContext);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const isTodoDownload = isError
    ? <p>something went wrong</p>
    : <TodoList />;

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
              {isLoaded
                ? <Loader />
                : isTodoDownload}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && <TodoModal />}
    </>
  );
};
