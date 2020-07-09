import React, { FC } from 'react';

interface TodoItemProps {
  id: number;
  userName: string;
  completed: boolean;
  title: string;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  title,
  userName,
  completed,
}) => (
  <li key={id}>
    <input
      type="checkbox"
      readOnly
      checked={completed}
    />
    <span>{title}</span>
    <small className="right">{userName}</small>
  </li>
);
