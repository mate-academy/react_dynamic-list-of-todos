import React, { useState, useEffect } from 'react';

import './CurrentUser.scss';
import { User } from '../../react-app-env';

import { getUser } from '../../api';

interface Props {
  userId: number,
  onUserIdSelected:(userId: number) => void,
}

export const CurrentUser: React.FC<Props> = ({
  userId,
  onUserIdSelected,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(response => setUser(response));
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user && (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {(`Selected user: ${user.id}`)}
            </span>
          </h2>

          <button
            type="button"
            onClick={() => {
              onUserIdSelected(0);
            }}
          >
            Clear
          </button>
        </>
      )}

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
    </div>
  );
};
