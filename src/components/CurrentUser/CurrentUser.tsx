import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getUserByIdFromServer } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  clearSelectedUserId: () => void;
};

export const CurrentUser: React.FC<Props>
= React.memo(({ selectedUserId, clearSelectedUserId }) => {
  const [isLoadingError, setLoadingError] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const getUser = useCallback(async () => {
    try {
      const user = await getUserByIdFromServer(selectedUserId);

      setLoadingError(false);
      setCurrentUser(user);
    } catch {
      setLoadingError(true);
      setCurrentUser(null);
    }
  }, [selectedUserId]);

  useEffect(() => {
    getUser();
  }, [selectedUserId]);

  return (
    <>
      { !isLoadingError && currentUser ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {currentUser.id}
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
            className="CurrentUser__btn-clear"
            type="button"
            onClick={clearSelectedUserId}
          >
            Clear
          </button>
        </div>
      )
        : (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>Loading Error</span>
            </h2>

            <h3 className="CurrentUser__name">
              No user data
            </h3>
          </div>
        )}
    </>
  );
});
