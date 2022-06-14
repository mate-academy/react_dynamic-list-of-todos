import React, { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { getUserbyId } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  clearUser: () => void,
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId, clearUser }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserbyId(selectedUserId)
      .then(setUser);
  }, [selectedUserId]);

  return (
    <>
      {user && (
        <div className="CurrentUser">
          <button
            type="button"
            onClick={clearUser}
          >
            Clear
          </button>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">
            {user.name}
          </h3>
          <p className="CurrentUser__email">
            {user.email}
          </p>
          <p className="CurrentUser__phone">
            {user.phone}
          </p>
        </div>
      )}
    </>
  );
};
