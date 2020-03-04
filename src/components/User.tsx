import React, { FC } from 'react';

interface UserProps {
  user: User;
}

export const User: FC<UserProps> = ({ user }) => {
  return <span className="person">{user.name}</span>;
};
