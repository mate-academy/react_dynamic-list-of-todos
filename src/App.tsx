/* eslint-disable max-len */
import React, {
  useContext,
  // useEffect,
  // useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodosContext } from './components/Store/Store';

export const App: React.FC = () => {
  const {
    loading,
    filteredTodos,
    selectedTodo,
  } = useContext(TodosContext);

  // eslint-disable-next-line no-console
  console.log('App');

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
              {loading && (<Loader />)}
              <TodoList filteredTodos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
