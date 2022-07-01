import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  userId: number;
  onSelect: (userId: number) => void;
}

export const CurrentUser: React.FC<Props> = ({
  userId,
  onSelect,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUser = useCallback(async () => {
    try {
      const loadedUser = await getUser(userId);

      if (loadedUser.id) {
        setSelectedUser(loadedUser);
      }
    } catch {
      setSelectedUser(null);
    }
  }, [userId]);

  useEffect(() => {
    loadUser();
  }, [userId]);

  return selectedUser
    ? (
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
          className="button CurrentUser__clear"
          onClick={() => onSelect(0)}
        >
          Clear
        </button>
      </div>
    )
    : (<p>User does not exist</p>);
};
