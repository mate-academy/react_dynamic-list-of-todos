import React, { FC } from 'react';

interface Props {
  todo: PreparedTodo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    user,
    completed,
  } = todo;

  return (
    <li
      className="list-group-item"
    >
      <div className="todo__cell todo__id">{id}</div>
      <div className="todo__cell todo__title">{title}</div>
      <div className="todo__cell todo__user">{user?.name}</div>
      <div className="todo__cell todo__completed">
        <input
          type="checkbox"
          defaultChecked={completed}
        />
      </div>
    </li>
  );
};
