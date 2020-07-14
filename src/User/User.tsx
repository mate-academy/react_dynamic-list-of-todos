import React, { FC } from 'react';

interface Props {
  user: User;
}

export const User: FC<Props> = ({ user }) => <>{user.name}</>;
