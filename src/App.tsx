/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodosContext, TodosProvider } from './TodosProvider';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const { isTodoSelected } = useContext(TodosContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <TodosProvider>
              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                {loading ? <Loader /> : <TodoList />}
              </div>
              {isTodoSelected && <TodoModal />}
            </TodosProvider>
          </div>
        </div>
      </div>
    </>
  );
};
