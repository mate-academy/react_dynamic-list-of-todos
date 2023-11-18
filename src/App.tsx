/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterContext } from './components/Contex/FilterContex';
import { getTodos } from './api';

export const App: React.FC = () => {
  const { filter } = useContext(FilterContext);
  const { modalOn } = filter;
  const [listLoader, setListLoader] = useState(false);

  useEffect(() => {
    setListLoader(true);
    getTodos().finally(() => setListLoader(false));
  }, []);

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
              {listLoader ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {modalOn && <TodoModal />}

    </>
  );
};
