import React, { useEffect, useState } from 'react';
import { getUserByID } from '../../api';
import { User } from '../../types/User';
import './CurrentUser.scss';

type Props = {
  userId: number;
  clearUser: (userId: number) => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    getUserByID(userId)
      .then(user => setSelectedUser(user));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {selectedUser?.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>

      <button
        type="button"
        className="button"
        onClick={() => clearUser(0)}
      >
        Clear
      </button>
    </div>
  );
};
