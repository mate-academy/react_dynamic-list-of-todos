import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppContext } from './components/Context/AppContext';

export const App: React.FC = () => {
  const {
    listLoader,
    selectedTodoId,
  } = useAppContext();

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
              {listLoader && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId > 0 && <TodoModal />}
    </>
  );
};
