import React from 'react';
import { PreparedTodo } from '../interfaces';

interface Props {
  todo: PreparedTodo;
}

export const Todo: React.FC<Props> = ({ todo }) => {
  const { user, title, completed } = todo;

  return (
    <tr>
      {user && (<td>{user.name}</td>)}
      <td className="text-left">{title}</td>
      {completed
        ? <td className="bg-success">Done</td>
        : <td className="bg-danger">Don&rsquo;t do</td>}
    </tr>
  );
};
