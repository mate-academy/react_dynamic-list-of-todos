/* eslint-disable max-len */
import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter } from './components/TodoFilter';
import { TodoContext } from './context/todo.context';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const { loadingTodoList, isModalOpen } = useContext(TodoContext);

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
                loadingTodoList
                  ? <Loader />
                  : <TodoList />
              }
            </div>
          </div>
          { isModalOpen && <TodoModal />}
        </div>
      </div>
    </>
  );
};
