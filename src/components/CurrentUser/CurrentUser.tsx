import React, { useState, useEffect } from 'react';
import { User } from '../../Types/User';
import { fetchUserById } from '../../api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  clearUser: () => void,
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId, clearUser }) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    fetchUserById(selectedUserId)
      .then(data => setSelectedUser(data));
  }, [selectedUserId]);

  return (

    <div className="CurrentUser">
      {selectedUser && (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {selectedUserId}
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
