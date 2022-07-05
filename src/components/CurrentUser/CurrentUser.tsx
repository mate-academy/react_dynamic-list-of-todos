import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { requestUsers } from '../../api/api';

type Props = {
  userId: number,
  setUserId: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, setUserId }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    requestUsers(userId)
      .then(userFromServer => setSelectedUser(userFromServer));
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
        className=" button"
        onClick={() => setUserId(0)}
      >
        Clear
      </button>
    </div>
  );
};
