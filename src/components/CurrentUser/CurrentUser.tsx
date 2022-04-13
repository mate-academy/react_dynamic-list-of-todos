/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { getUser } from '../../api';
import { User } from '../../types';
import './CurrentUser.scss';

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setHasError(false);
    setUser(null);
    getUser(userId)
      .then(loadedUser => setUser(loadedUser))
      .catch(() => setHasError(true));
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            className="button CurrentUser__clear"
            type="button"
            onClick={clearUser}
          >
            Clear
          </button>
        </>
      ) : (!hasError ? <Triangle ariaLabel="loading-indicator" />
        : 'Error: No user information was founded')}
    </div>
  );
};

interface Props {
  userId: number,
  clearUser: () => void,
}
