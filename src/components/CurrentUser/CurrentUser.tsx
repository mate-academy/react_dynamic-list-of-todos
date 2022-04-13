import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { User } from '../../interfaces';
import { getUsersId } from '../../api';

interface Props {
  userId: number;
  clearUser: () => void;
}

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    getUsersId()
      .then(usersFromServer => setSelectedUser(usersFromServer));
  }, []);

  // eslint-disable-next-line no-console
  console.log(selectedUser);

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
        type="button"
        onClick={clearUser}
      >
        Clear
      </button>
    </div>
  );
};
