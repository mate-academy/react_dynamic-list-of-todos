import React, { FC } from 'react';
import { TodosWithUsers } from '../../interfaces';
import './Todo.css';

interface Props {
  todo: TodosWithUsers;
}

export const Todo: FC<Props> = ({ todo }) => {
  const {
    user, title, completed,
  } = todo;

  return (
    <div className="Todo">
      <small style={{ color: completed ? 'yellowgreen' : 'coral' }}>
        {completed ? 'done' : 'not done'}
      </small>
      <p>{title}</p>
      <small>
        {`For: ${user.name}`}
      </small>
    </div>
  );
};
