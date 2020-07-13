import React from 'react';
import { TodoModified } from '../interfaces/data';

export const TodoItem: React.FC<TodoModified> = (props) => {
  const { title, completed, userName } = props;

  return (
    <div className={`todos__item${completed
      ? ' todos__item--completed' : ''}`}
    >
      <p>{title}</p>
      <p>
        <span>User</span>
        :
        {' '}
        {userName}
      </p>
      <p>{completed ? 'completed' : 'not completed'}</p>
    </div>
  );
};
