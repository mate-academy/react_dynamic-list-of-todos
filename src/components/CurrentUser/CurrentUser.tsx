import React, { useState, useEffect, useCallback } from 'react';
import { getUserFromServer } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  clearUser: () => void,
};

export const CurrentUser: React.FC<Props> = React.memo(({
  userId,
  clearUser,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingError, setLoadingError] = useState(false);

  const getUser = useCallback(async () => {
    try {
      const newUser = await getUserFromServer(userId);

      setLoadingError(false);
      setCurrentUser(newUser);
    } catch {
      setCurrentUser(null);
      setLoadingError(true);
    }
  }, [userId]);

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <>
      {currentUser && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {currentUser.name}
          </h3>
          <p className="CurrentUser__email">
            {currentUser.email}
          </p>
          <p className="CurrentUser__phone">
            {currentUser.phone}
          </p>

          <button
            type="button"
            className="CurrentUser__clear"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      )}

      {isLoadingError && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Please, try again
            </span>
          </h2>
        </div>
      )}
    </>
  );
});
