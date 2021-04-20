import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export const CurrentUser = ({ userId }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUser = async() => {
    const result = await getUser(userId);

    setSelectedUser(result);
  };

  useEffect(() => {
    loadUser();
  }, [userId]);

  if (!selectedUser) {
    return 'Loading...';
  }

  return (
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
  );
};
