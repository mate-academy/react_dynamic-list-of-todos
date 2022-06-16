import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';
import { User } from '../../react-app-env';

type Props = {
  userId: number,
  onHandlerClear: () => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, onHandlerClear }) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    getUser(userId)
      .then(user => {
        setSelectedUser(user);
      });
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUser?.id}`}</span></h2>

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
        onClick={onHandlerClear}
        className="button"
      >
        Clear
      </button>
    </div>
  );
};
