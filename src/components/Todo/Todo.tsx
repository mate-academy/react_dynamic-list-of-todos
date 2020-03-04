import React, { FC } from 'react';
import { User } from '../User/User';
import { TodoType } from '../../types';
import './Todo.css';

interface Props {
  todo: TodoType;
}

export const Todo: FC<Props> = ({ todo: { title, user, completed } }) => {
  return (
    <>
      <p className="todo__title">{title}</p>
      <User user={user} />
      <p className="todo__status">{completed ? 'OK' : '-'}</p>
    </>
  );
};
