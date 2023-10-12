import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { todoContext, DefaultValueType } from './Contexts/Context';

export const App: React.FC = () => {
  const {
    currentItem,
    visibleItems,
  } = React.useContext(todoContext) as DefaultValueType;

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
              {
                visibleItems.length
                  ? <TodoList />
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {currentItem.isVisible && <TodoModal />}
    </>
  );
};
