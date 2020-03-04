import React, { FC } from 'react';
import { PreparedTodo } from '../utils/interfaces';

interface Props {
  todo: PreparedTodo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <tr>
      <td>{id}</td>
      <td>{user ? user.name : ''}</td>
      <td>{title}</td>
      <td>{completed ? 'Yes' : 'No'}</td>
    </tr>
  );
};
