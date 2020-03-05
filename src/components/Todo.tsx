import React, { FC } from 'react';
import { TodoWithUser } from '../utils/types'

interface Props {
  todo: TodoWithUser;
}

export const Todo: FC<Props> = ({ todo }) => (
  <tr>
    <td className='cell'>{todo.id}</td>
    <td className='cell'>{todo.title}</td>
    <td className='cell'>{todo.user ? todo.user.name : ' - '}</td>
    <td className='cell'>{todo.completed ? 'pending' : 'completed'}</td>
  </tr>
);

