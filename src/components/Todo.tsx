import React, { FC } from 'react';
import { TodoWithUser } from '../utils';

interface Props {
  todo: TodoWithUser;
}

export const Todo: FC<Props> = ({ todo }) => {
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{todo.user ? todo.user.name : ' - '}</td>
      <td>{todo.completed ? 'pending' : 'completed'}</td>
    </tr>
  );
};
