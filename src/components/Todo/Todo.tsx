import React, { FC } from 'react';
import { User } from '../User/User';

interface Props {
  todo: TodoWithUser;
}

export const Todo: FC<Props> = ({ todo }) => (
  <tr className="row">
    <User user={todo.user} />
    <td className="column">{todo.title}</td>
    <td className="column">{todo.completed ? 'Done' : '---'}</td>
  </tr>
);
