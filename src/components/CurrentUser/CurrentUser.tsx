import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../api';

type Props = {
  userId: number
  selectUserId: (userId: number) => void
};

export const CurrentUser: React.FC<Props> = ({ userId, selectUserId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState<boolean>(false);

  useEffect(() => {
    getUser(userId).then(async response => {
      if (response.ok) {
        setUser(null);
        setUser(await response.json());
      } else {
        setUserError(true);
      }
    });
  }, [userId]);

  return (
    <div className="CurrentUser">
      {userError ? (
        <p>User error...</p>
      ) : (
        <>
          {user ? (
            <>
              <h2 className="CurrentUser__title">
                <span>
                  Selected user:&nbsp;
                  {userId}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{user?.name}</h3>
              <p className="CurrentUser__email">{user?.email}</p>
              <p className="CurrentUser__phone">{user?.phone}</p>
              <button
                onClick={() => selectUserId(0)}
                className="button"
                type="button"
              >
                Clear
              </button>
            </>
          ) : (
            <p>Loading or server error</p>
          )}
        </>
      )}
    </div>
  );
};
