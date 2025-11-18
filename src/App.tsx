/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Error } from './components/Error';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { todoContext } from './contexts/TodoContext';

export const App: React.FC = () => {
  const { modalOpen, hasError, isLoading, userError } =
    React.useContext(todoContext);

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
              {isLoading ? <Loader /> : hasError ? <Error /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {userError ? <Error /> : modalOpen && <TodoModal />}
    </>
  );
};
