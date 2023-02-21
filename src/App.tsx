/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { GlobalContext } from './reducer';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [state, dispatch] = useContext(GlobalContext);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getTodos().then(response => {
      dispatch({ type: 'RequestListTodos', list: response });
      setLoad(false);
    });
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
              {load ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {state.check && <TodoModal />}
    </>
  );
};
