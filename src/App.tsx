import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Error } from './components/Error';
import { todoContext } from './contexts/TodoContext';

export const App: React.FC = () => {
  const { modalOpen, hasError, isLoading } = useContext(todoContext);

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

      {modalOpen && <TodoModal />}
    </>
  );
};
