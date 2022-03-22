import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  selectUserId: (userId: number) => (void),
};

export const CurrentUser: React.FC<Props> = ({ userId, selectUserId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:&nbsp;
          {userId}
        </span>
      </h2>
      {user ? (
        <>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </>
      ) : (
        <p>No user</p>
      )}
      <button
        className="CurrentUser__clear"
        type="button"
        onClick={() => selectUserId(0)}
      >
        Clear
      </button>
    </div>
  );
};
