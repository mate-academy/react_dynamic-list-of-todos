import React, { useEffect, useState } from 'react';
import { getUsersById } from '../../api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number;
  onSetSelectedUserId: (userId: number) => void;
}

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  onSetSelectedUserId,
}) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    getUsersById(selectedUserId)
      .then(user => {
        return setSelectedUser(user);
      });
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${selectedUser?.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{selectedUser?.username}</h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>
      <button
        className="TodoList__user-button button"
        type="button"
        onClick={() => {
          onSetSelectedUserId(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
