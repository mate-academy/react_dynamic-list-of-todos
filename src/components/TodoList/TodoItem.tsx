import React from 'react';
import cn from 'classnames';
import { Todo } from '../Interfaces';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({
  todo,
}) => (
  <tr className={cn({ 'is-selected': todo.completed })}>
    <td>
      {todo.id}
    </td>
    <td>
      {todo.user.username}
    </td>
    <td>
      {todo.title}
    </td>
    <td>
      {todo.completed && 'Completed'}
    </td>
  </tr>
);
