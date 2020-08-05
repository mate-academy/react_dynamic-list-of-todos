import React, { FC } from 'react';
import { PreparedTodo } from '../../interfaces';

interface Props {
  content: PreparedTodo;
}

export const TodoItem: FC<Props> = ({ content }) => {
  const { todo, user } = content;
  const { title, completed } = todo;
  const { name } = user;

  return (
    <div>
      <input type="checkbox" checked={completed} disabled />
      <span>{title}</span>
      {' '}
      <strong>{name}</strong>
    </div>
  );
};
