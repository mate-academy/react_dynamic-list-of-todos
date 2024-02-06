/* eslint-disable max-len */
import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodosContext } from './components/State';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const { isLoading } = useContext(TodosContext);

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
              {isLoading && (
                <Loader />
              )}
            </div>

            <div className="block">
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
