/* eslint-disable max-len */
import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { StateContext } from './context/TodoContext';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const { isLoading, isModal } = useContext(StateContext);

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
              {isLoading
                ? <Loader />
                : <TodoList />
              }
            </div>
          </div>
        </div>
      </div>

      {isModal && <TodoModal />}
    </>
  );
};
