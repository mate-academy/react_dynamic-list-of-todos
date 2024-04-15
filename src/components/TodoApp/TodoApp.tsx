import React, { useContext } from 'react';
import { TodoList } from '../TodoList';
import { TodoFilter } from '../TodoFilter/';
import { Loader } from '../Loader';
import { TodoContext } from '../Todocontext/TodoContext';
import { TodoModal } from '../TodoModal';

export const TodoApp: React.FC = () => {
  const { loader, showUserDetails, selectedTodo, selectedUser } =
    useContext(TodoContext);

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
              {loader && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
        {showUserDetails && (
          <TodoModal user={selectedUser} todo={selectedTodo} />
        )}
      </div>
    </>
  );
};
