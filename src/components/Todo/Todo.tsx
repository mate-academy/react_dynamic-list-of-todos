import React, { FC } from 'react';

// import User from '../user/User';

interface Props{
  todo: TodosWithUsers;
}

export const Todo: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <>
      <td className="table__cell">{id}</td>
      <td className="table__cell">{user ? user.name : ''}</td>
      <td className="table__cell">{title}</td>
      <td className="table__cell">{`${completed}`}</td>
    </>
  );
};
