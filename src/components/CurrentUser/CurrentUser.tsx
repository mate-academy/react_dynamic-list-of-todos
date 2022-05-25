import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';

import { getUsers } from '../../api';
import { User } from '../../react-app-env';

type Props = {
  userId: number,
  clearUser: () => void
};

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [isError, setError] = useState(false);
  const [currentUser, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const getedUser = await getUsers(userId);

      setError(false);
      setUser(getedUser);
    } catch {
      setError(true);
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <>
      { currentUser && (
        <div className="CurrentUser" key={currentUser.id}>
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${currentUser.username}`}</span>
          </h2>
          <h3
            className="CurrentUser__name"
            data-cy="userName"
          >
            {currentUser.name}
          </h3>
          <p className="CurrentUser__email">{currentUser.email}</p>
          <p className="CurrentUser__phone">{currentUser.phone}</p>
          <button
            type="button"
            className="button is-light CurrentUser__clear"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      )}
      { isError && (
        <p>Error</p>
      )}

    </>
  );
};
