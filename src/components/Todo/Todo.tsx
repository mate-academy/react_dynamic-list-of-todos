import React from 'react';
import './Todo.css';
import { User } from '../User/User';

type TodoProps = {
  todo: Todo;
};

export const Todo: React.FC<TodoProps> = (props) => {
  const { todo } = props;

  return (
    <>
      <span className="title">
        {todo.title}
      </span>

      <User user={todo.user} />

      <span className={`todo__status todo__status-${todo.completed}`}>
        {todo.completed.toString()}
      </span>
    </>
  );
};
