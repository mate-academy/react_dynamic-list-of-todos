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
    <tr className="table__row">
      <td className="table__cell">{id}</td>
      <td className="table__cell">{user.name}</td>
      <td className="table__cell">{title}</td>
      <td className="table__cell">{`${completed}`}</td>
    </tr>
  );
};
