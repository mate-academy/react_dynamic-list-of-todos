import React, { FC } from 'react';
import './TodoItem.css';
import { TodosWithUser } from '../../interfaces';

interface Props {
  todo: TodosWithUser;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const { completed, title, user } = todo;

  return (
    <>
      <div className={completed ? 'done' : 'undone'} />
      <p className="task">
        {title}
      </p>
      <p className="person">
        {user.name}
      </p>
    </>
  );
};
