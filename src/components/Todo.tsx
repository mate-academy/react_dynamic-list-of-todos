import React, { FC } from 'react';

interface Props {
  todo: TodoWithUser;
}

export const Todo: FC<Props> = ({ todo }) => {
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
      {completed ? (
        <td className="bg-success">{`${completed}`}</td>
      ) : (
        <td className="bg-danger">{`${completed}`}</td>
      )}
    </tr>
  );
};
