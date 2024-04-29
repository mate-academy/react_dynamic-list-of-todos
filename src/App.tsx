import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { DispatchContext, StateContext } from './types/Store';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { selectedTodoId } = state;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getTodos().then(data => {
      dispatch({
        type: 'setTodos',
        payload: data,
      });

      setLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{loaded ? <TodoList /> : <Loader />}</div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && <TodoModal />}
    </>
  );
};
