import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  userId: number;
  onSelect: (userId: number) => void;
}

export const CurrentUser: React.FC<Props> = ({ userId, onSelect }) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const loadUser = async () => {
    const loadedUser = await getUser(userId);

    setSelectedUser(loadedUser);
  };

  useEffect(() => {
    loadUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>

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
        className="button CurrentUser__clear"
        onClick={() => onSelect(0)}
      >
        Clear
      </button>
    </div>
  );
};
