import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { User } from '../types';
import { getUser } from '../api';

type Props = {
  userId: number,
  selectUser: (userId: number) => void
};

export const CurrentUser: React.FC<Props> = ({ userId, selectUser }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(userId)
      .then(selectedUser => {
        setUser(selectedUser);
      });
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user && (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {user.id}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button type="button" onClick={() => selectUser(0)}>
            Clear
          </button>
        </>
      )}
    </div>
  );
};
