import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';

import './CurrentUser.scss';

type Props = {
  userId: number;
  changeUser: (id: number) => void;
};

type User = {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};

export const CurrentUser: React.FC<Props> = ({ userId, changeUser }) => {
  const [user, setUser] = useState<User | null>(null);

  const clearUser = () => {
    setUser(null);
    changeUser(0);
  };

  useEffect(() => {
    getUser(userId).then(result => {
      if (result) {
        setUser(result);
      } else {
        setUser(null);
      }
    });
  }, [userId]);

  return (
    <>
      {!user ? (
        <p>Don&apos;t have data about a user</p>
      ) : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {'Selected user: '}
              {user.id}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            type="button"
            onClick={() => {
              clearUser();
            }}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
