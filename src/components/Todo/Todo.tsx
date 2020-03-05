import React from 'react';

interface Props {
  todo: TodoWithUser;
}

export const Todo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    user,
    title,
    completed,
  } = todo;

  return (
    <tr>
      <td>{id}</td>
      <td>{user.name}</td>
      <td>{title}</td>
      <td>{`${completed}`}</td>
    </tr>
  );
};
