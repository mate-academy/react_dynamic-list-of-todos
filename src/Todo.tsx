import React, { FC } from 'react';
import { TodoWithUser } from './types';

interface Props {
  todo: TodoWithUser;
}

export const Todo: FC<Props> = ({ todo }) => {
  return (
    <tr>
      <td>{todo.user.name}</td>
      <td>{todo.title}</td>
      <td>{todo.completed ? 'Complete' : 'Do it!'}</td>
    </tr>
  );
};
