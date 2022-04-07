import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api/api';

type Props = {
  selectedUser: number,
};

export const CurrentUser: React.FC<Props> = ({ selectedUser }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedUser) {
      getUsers(selectedUser)
        .then(users => setCurrentUser(users));
    }
  }, [selectedUser]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUser}`}</span></h2>
      {selectedUser && (
        <>
          <h3 className="CurrentUser__name">{currentUser?.name}</h3>
          <p className="CurrentUser__email">{currentUser?.email}</p>
          <p className="CurrentUser__phone">{currentUser?.phone}</p>
        </>
      )}
    </div>
  );
};
