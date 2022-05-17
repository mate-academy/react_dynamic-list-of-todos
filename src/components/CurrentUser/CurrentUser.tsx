import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { User } from '../../interfaces';
import { getSelectedUser } from '../../api';

interface Props {
  userId: number;
  clearUser: () => void;
}

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    getSelectedUser(userId)
      .then(user => setSelectedUser(user));
  }, [userId]);

  // eslint-disable-next-line no-console
  console.log(selectedUser);

  return (
    <div className="CurrentUser">
      {selectedUser
        && (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {selectedUser.id}
              </span>
            </h2>
            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>
            <button
              type="button"
              onClick={clearUser}
            >
              Clear
            </button>
          </>
        )}
    </div>
  );
};
