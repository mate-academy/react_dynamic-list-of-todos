import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api';

type Props = {
  userId: number;
  clearUser: () => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUsers(userId)
      .then(userFromServer => setUser(userFromServer));
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {user?.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          <button
            type="button"
            className="CurrentUser__clear"
            onClick={clearUser}
          >
            Clear
          </button>
        </>
      ) : <p> Loading...</p>}

    </div>
  );
};
