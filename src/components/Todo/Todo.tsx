import React, { FC } from 'react';

interface Props {
  todo: PreparedTodo;
}

export const Todo: FC<Props> = ({ todo }) => {
  const { id, title, user } = todo;

  return (
    <tr>
      <th>{id}</th>
      <th>{user?.name}</th>
      <th>{title}</th>
    </tr>
  );
};
