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
    <tr className="table__row">
      <td className="table__cell">{id}</td>
      <td className="table__cell">{user.name}</td>
      <td className="table__cell">{title}</td>
      <td className="table__cell">{completed ? 'Yes' : 'No'}</td>
    </tr>
  );
};
