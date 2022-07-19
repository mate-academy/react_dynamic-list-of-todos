import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import { User } from '../../react-app-env';

import './CurrentUser.scss';

type Props = {
  userId: number,
  onUserIdChange: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = React.memo(({
  userId,
  onUserIdChange,
}) => {
  const [
    selectedUser,
    setSelectedUser,
  ] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(user => setSelectedUser(user));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${selectedUser?.id}`}</span>
      </h2>

      <h3
        data-cy="userName"
        className="CurrentUser__name"
      >
        {selectedUser && (
          selectedUser.name
        )}
      </h3>

      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>

      <button
        className="btn btn-danger"
        type="button"
        onClick={() => {
          onUserIdChange(0);
        }}
      >
        Clear
      </button>
    </div>
  );
});
