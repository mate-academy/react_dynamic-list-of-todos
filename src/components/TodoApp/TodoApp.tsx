/*eslint-disable*/
import React, { useContext } from "react";
import { TodoFilter } from "../TodoFilter";
import { TodoList } from "../TodoList";
import { TodosContext } from "../../context/TodoContext";
import { Loader } from "../Loader";
import { TodoModal } from "../TodoModal";

export const TodoApp: React.FC = () => {
  const { todos, isTodoLoading, isOpenModal } = useContext(TodosContext);

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
              {isTodoLoading ? <Loader /> : <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && <TodoModal />}
    </>
  );
};
