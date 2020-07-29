import React, { FC } from 'react';
import { User } from '../types';

type UsersProps = {
  users: User[];
};

export const Users: FC<UsersProps> = (props) => {
  const {
    users,
  } = props;

  return (
    <>
      <h2>Users</h2>
      {users.map((user: User) => (
        <p
          key={user.id}
        >
          <span>{`id = ${user.id}, ${user.name}`}</span>
        </p>
      ))}
    </>
  );
};
