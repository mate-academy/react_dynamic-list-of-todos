import React, { useContext } from 'react';
import { TodoFilter } from './TodoFilter';
import { TodoList } from './TodoList';
import { Loader } from './Loader';
import { TodosContext } from '../context/TodosContext';
import { TodoModal } from './TodoModal';

export const TodoApp: React.FC = () => {
  const { loading, modal } = useContext(TodosContext);

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
              {loading
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {modal && <TodoModal />}
    </>
  );
};
