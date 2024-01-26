import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { StateContext } from './management/TodoContextProvider';

export const App: React.FC = () => {
  const { isEyeSlash, todos } = useContext(StateContext);

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
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList />
              )}

            </div>
          </div>
        </div>
      </div>

      {isEyeSlash && <TodoModal />}
    </>
  );
};
