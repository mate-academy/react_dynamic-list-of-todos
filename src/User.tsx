import React, { FC } from 'react';

interface Props {
  users: User;
}

export const User: FC<Props> = ({ users }) => (
  <>
    {users.name}
  </>
);
