import React, { FC } from 'react';
import { PreparedTodo } from '../interfaces';

interface Props {
  todo: PreparedTodo;
}

export const Todo: FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
  } = todo;

  return (
    <>
      <p>{title}</p>
      <p>{todo.user.name}</p>
      <p>{completed ? 'Completed' : 'Not complete'}</p>
    </>
  );
};
