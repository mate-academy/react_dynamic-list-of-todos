import React, { FC } from 'react';
import './Todo.css';

interface Props {
  todo: TodoWithUser;
}

export const Todo: FC<Props> = ({ todo }) => (
  <tr className="todo-list__item">
    <td className="todo-list__item-info">
      {todo.id}
    </td>
    <td className="todo-list__item-info">
      {todo.user ? todo.user.name : ''}
    </td>
    <td className="todo-list__item-info">
      {todo.title}
    </td>
    <td className="todo-list__item-info">
      {todo.completed ? '🟢' : '❌'}
    </td>
  </tr>
);
