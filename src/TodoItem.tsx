import React, { FC } from 'react';
import { User } from './User';

interface Props {
  todo: TodoWithUser;
}

export const Todoitem: FC<Props> = ({ todo }) => (
  <tr>
    <td>{todo.title}</td>
    <td>
      {todo.completed
        ? 'done'
        : 'in process'}
    </td>
    <td><User users={todo.user} /></td>
  </tr>
);
