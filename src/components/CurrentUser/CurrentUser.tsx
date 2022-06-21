import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number;
  changeUser: (userId: number) => void;
};

export const CurrentUser: React.FC<Props>
= ({ selectedUserId, changeUser }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedUserId)
      .then((userFromServer) => {
        setSelectedUser(userFromServer);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error.message);
        setSelectedUser(null);
      });
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {selectedUserId}
        </span>
      </h2>

      <h3
        className="CurrentUser__name"
        data-cy="userName"
      >
        {selectedUser?.name}
      </h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>

      {selectedUserId && (
        <button
          type="submit"
          className="button CurrentUser__clear-button"
          onClick={() => changeUser(0)}
          data-cy="userButton"
        >
          Clear
        </button>
      )}
    </div>
  );
};
