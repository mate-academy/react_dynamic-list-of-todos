import React, { useEffect, useState } from 'react';
import { getUserById } from '../../api';
import { User } from '../../types';
import './CurrentUser.scss';

interface Props {
  userId: number;
  onClear: () => void;
}

export const CurrentUser: React.FC<Props> = ({ userId, onClear }) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    getUserById(userId)
      .then(data => setSelectedUser(data));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {userId}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>
      <button
        className="button"
        type="button"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  );
};
