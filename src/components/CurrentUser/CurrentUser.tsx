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
      const load = await getUser(userId);

      if (load?.id) {
        setSelectedUser(load);
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
          <span>{`Selected user: ${selectedUser.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name" data-cy="userName">
          {selectedUser.name}
        </h3>
        <p className="CurrentUser__email">{selectedUser.email}</p>
        <p className="CurrentUser__phone">{selectedUser.phone}</p>

        <button
          type="button"
          className="CurrentUser__clear"
          onClick={() => onSelect(0)}
        >
          Clear
        </button>
      </div>
    )
    : (<div>User does not exist</div>);
};
