import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../api';

type Props = {
  userId: number
  selectUserId: (userId: number) => void
};

export const CurrentUser: React.FC<Props> = ({ userId, selectUserId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(response => setUser(response));
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
        <p>Loading...</p>
      )}
    </div>
  );
};
