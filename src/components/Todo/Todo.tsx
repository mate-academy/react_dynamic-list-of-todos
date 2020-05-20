import React, { FC } from 'react';

interface Props {
  todo: TodoWithUser;
}

export const Todo: FC<Props> = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.user ? todo.user.name : ''}</td>
    <td>{todo.title}</td>
    <td>{todo.completed ? 'Complete' : 'Incomplete'}</td>
  </tr>
);
