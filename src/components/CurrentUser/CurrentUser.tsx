import React, { useEffect, useState } from 'react';
import { User, CurrentUserProps } from '../../types';
import { getUser } from '../../api';
import './CurrentUser.scss';

// eslint-disable-next-line max-len
export const CurrentUser: React.FC<CurrentUserProps> = ({ userId, onUnselect }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setSelectedUser(await getUser(userId));
    };

    try {
      fetchUser();
    } catch {
      setSelectedUser(null);
    }
  }, [userId]);

  return selectedUser && (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {userId}
        </span>

      </h2>

      <h3 className="CurrentUser__name" data-cy="userName">
        {selectedUser?.name}
      </h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>
      <button
        type="button"
        className="CurrentUser__clear"
        onClick={() => onUnselect(0)}
      >
        Clear
      </button>
    </div>
  );
};
