import React from 'react';
import { CurrentUserProps } from '../../types/types';
import './CurrentUser.scss';

export const CurrentUser: React.FC<CurrentUserProps> = ({ users, selectedUserId }) => {
  const selectedUser = users.find(user => user.id === selectedUserId);

  return selectedUser ? (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {selectedUser.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{selectedUser.name}</h3>
      <p className="CurrentUser__email">{selectedUser.email}</p>
      <p className="CurrentUser__phone">{selectedUser.phone}</p>
    </div>
  ) : (
    null
  );
};
