import React, { useEffect, useState } from 'react';
import { getSelectedUser } from '../../api/api';
import { User } from '../../types';
import './CurrentUser.scss';

interface Props {
  userId: number;
  clearUser: () => void;
}

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getSelectedUser(userId)
      .then(user => setSelectedUser(user));
  }, [userId]);

  return (
    <div className="CurrentUser">
      {selectedUser
        && (
          <>
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${selectedUser.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>
            <button
              type="button"
              onClick={() => clearUser()}
            >
              Clear
            </button>
          </>
        )}
    </div>
  );
};
