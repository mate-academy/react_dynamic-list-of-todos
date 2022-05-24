import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number;
  setSelectedUser: (userId: number | null) => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, setSelectedUser }) => {
  const [user, setUser] = useState<User | null>(null);
  const fetchUser = useCallback(async () => {
    const newUser = await getUser(userId);

    setUser(newUser);
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:&nbsp;
              {userId}
            </span>
          </h2>

          <h3
            data-cy="userName"
            className="CurrentUser__name"
          >
            {user.name}
          </h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          {userId && (
            <button
              data-cy="userButton"
              className="CurrentUser__button"
              type="button"
              onClick={() => setSelectedUser(0)}
            >
              Clear
            </button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
