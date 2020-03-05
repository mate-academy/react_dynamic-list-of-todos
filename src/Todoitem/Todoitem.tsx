import React, { FC } from 'react';
import { User } from '../User/User';

interface Props {
  todo: TodoWithUser;
}

export const Todoitem: FC<Props> = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td className="state">{todo.completed ? 'ready' : 'not ready'}</td>
    <td><User user={todo.user} /></td>
  </tr>
);
