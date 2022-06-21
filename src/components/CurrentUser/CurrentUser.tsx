import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { findUser } from '../../api/api';
import { User } from '../../react-app-env';

type Props = {
  userId: number;
  deleteUser: () => void;
};

export const CurrentUser: React.FC<Props> = React.memo(({
  userId,
  deleteUser,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    findUser(userId)
      .then(user => setSelectedUser(user));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${selectedUser?.id}`}</span>
      </h2>

      <h3 className="CurrentUser__name" data-cy="userName">
        {selectedUser?.name}
      </h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>

      <button
        type="button"
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
          CurrentUser__button
        "
        onClick={deleteUser}
      >
        Clear
      </button>
    </div>
  );
});
