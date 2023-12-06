/* eslint-disable max-len */
import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { StateContext } from './components/Provider/Context';

export const App: React.FC = () => {
  const { loading, hasTodoModal, todos } = useContext(StateContext);

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

              {loading && (
                <Loader />
              )}

              {todos.length > 0 && (
                <TodoList />
              )}

            </div>
          </div>
        </div>
      </div>

      {hasTodoModal && (
        <TodoModal />
      )}
    </>
  );
};
