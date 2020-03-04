import React, { FC } from 'react';
import { TodoWithUser } from '../../constants/types';
import 'bulma/css/bulma.css';

interface Props {
  todo: TodoWithUser;
}

export const TodoItem: FC<Props> = ({ todo }) => (
  <tr className="tr">
    <td className="td">{todo.id}</td>
    <td className="td">{todo.title}</td>
    <td className="td">{todo.completed ? 'YES' : 'NO'}</td>
    <td className="td">{todo.user.name}</td>
  </tr>
);
