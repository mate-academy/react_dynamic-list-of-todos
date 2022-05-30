import React, { useCallback, useEffect, useState } from 'react';
import { getUsers } from '../../api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

type Props = {
  userId: number,
  clearUser: () => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<boolean | null>(null);

  const getUserFromServer = useCallback(async () => {
    try {
      const userFromServer = await getUsers(userId);

      setUser(userFromServer);
      setError(null);
    } catch {
      setUser(null);
      setError(true);
    }
  }, [userId]);

  useEffect(() => {
    getUserFromServer();
  }, [userId]);

  return (
    <div
      className="CurrentUser"
    >
      {user && (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user.id}`}
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
          <button
            onClick={clearUser}
            type="button"
            data-cy="userButton"
            className="CurrentUser__clear button-user"
          >
            Clear user
          </button>
        </>
      )}

      {error && (
        <div>
          Please try again later
        </div>
      )}
    </div>
  );
};
