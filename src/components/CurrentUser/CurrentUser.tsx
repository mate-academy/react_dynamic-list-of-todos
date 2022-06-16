import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number;
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedUserId)
      .then((userFromServer) => {
        setSelectedUser(userFromServer);
      });
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {selectedUserId}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>
    </div>
  );
};
