import React, { useCallback, useEffect, useState } from 'react';
import { getUserFromServer } from '../../api/api';
import { User } from '../../types/User';
import './CurrentUser.scss';

type Props = {
  userId: number,
  onClearUser: () => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, onClearUser }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(true);

  const getUser = useCallback(async () => {
    try {
      const newUser = await getUserFromServer(userId);

      setUser(newUser);
      setIsDownloadSuccess(true);
    } catch {
      setUser(null);
      setIsDownloadSuccess(false);
    }
  }, [userId]);

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:&nbsp;
          {userId}
        </span>
      </h2>
      {isDownloadSuccess && (
        <>
          <h3 className="CurrentUser__name" data-cy="userName">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          {user && (
            <button
              className="CurrentUser__clear button"
              type="button"
              onClick={onClearUser}
            >
              Clear
            </button>
          )}
        </>
      )}
      {!isDownloadSuccess && (
        <div className="CurrentUser__error">Can&apos;t load user</div>
      )}
    </div>
  );
};
