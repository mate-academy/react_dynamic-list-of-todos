import React, { FC } from 'react';
import { PreparedTodos } from './interfaces';

interface Props {
  todo: PreparedTodos;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  return (
    <li>
      {todo.title}
      <input type="checkbox" checked={todo.completed} />
      <b>{todo.user.name}</b>
    </li>
  );
};
