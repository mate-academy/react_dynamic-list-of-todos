import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number,
  changeUser: (id: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, changeUser }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>();

  useEffect(() => {
    getUser(userId)
      .then(user => setSelectedUser(user))
      .catch(() => {
        changeUser(0);
        setSelectedUser(null);
      });
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${selectedUser?.id}`}</span>
      </h2>

      <h3
        className="CurrentUser__name"
        data-cy="userName"
      >
        {selectedUser?.name}
      </h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>

      <button
        type="button"
        data-cy="userButton"
        onClick={() => {
          changeUser(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
