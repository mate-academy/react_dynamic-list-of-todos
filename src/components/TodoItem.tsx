import React, { FC } from 'react';
import { User } from './User';

interface TodoProps {
  todo: TodoWithUser;
}

export const TodoItem: FC<TodoProps> = ({ todo }) => {
  return (
    <li className="list__item">
      <h4 className="title">{todo.title}</h4>
      {todo.completed
        ? (<span className="complete">done</span>)
        : (<span className="incomplete">not done</span>)}
      <User user={todo.user} />
    </li>
  );
};
