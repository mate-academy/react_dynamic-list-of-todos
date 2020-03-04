import React, { FC } from 'react';
import { TodoWithUser } from './types';

interface Props {
  currentTodo: TodoWithUser;
}

export const Todo: FC<Props> = ({ currentTodo }) => {
  return (
    <tr>
      <td>{currentTodo.user.name}</td>
      <td>{currentTodo.title}</td>
      <td>{currentTodo.completed ? 'Complete' : 'Do it!'}</td>
    </tr>
  );
};
