import React from 'react';
import { User } from '../types/User';

type Props = {
  selectedUser: User;
};

export const UserInfo: React.FC<Props> = ({ selectedUser }) => {
  return (
    <a href={`mailto:${selectedUser.email}`}>
      {selectedUser.name}
    </a>
  );
};
