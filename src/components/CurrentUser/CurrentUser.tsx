/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { requestUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  setUserId: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, setUserId }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    requestUser(userId).then(promise => setSelectedUser(promise));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUser?.id}`}</span></h2>

      <h3 data-cy="userName" className="CurrentUser__name">{selectedUser?.name}</h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>
      <button
        type="button"
        className="TodoList__user-button button"
        onClick={
          () => setUserId(0)
        }
      >
        Clear
      </button>
    </div>
  );
};
