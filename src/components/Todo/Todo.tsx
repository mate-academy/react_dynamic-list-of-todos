import React from 'react';
import { TodoWithUserInterface } from '../../interfaces';

interface Props {
  todo: TodoWithUserInterface;
}

export const Todo: React.FC<Props> = (props) => {
  const { todo } = props;

  return (
    <li className="item">
      <p>{todo.user.name}</p>
      <p className="item__title">{todo.title}</p>
      {
        todo.completed
          ? <p className="item__completed">Done</p>
          : <p className="item__uncompleted">Not Done Yet</p>
      }
    </li>
  );
};
