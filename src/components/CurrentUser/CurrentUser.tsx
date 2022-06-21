/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { urlUser, requestUser } from '../api/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  onClear: () => void;
};

type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};

export const CurrentUser: React.FC <Props> = ({ selectedUserId, onClear }) => {
  const userId = selectedUserId;
  const [user, setUser] = useState<User | null>(null);

  const urlSelectedUser = urlUser + userId;

  useEffect(() => {
    requestUser(urlSelectedUser)
      .then(response => {
        if (!response.ok) {
          setUser(null);
        } else {
          response.json()
            .then((userFromServer) => setUser(userFromServer))
            .catch(error => {
              if (error) {
                setUser(null);
              }
            });
        }
      });
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user === null ? ('User not found') : (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user.id}`}
            </span>
          </h2>

          <h3
            className="CurrentUser__name"
            data-cy="userName"
          >
            {user.name}
          </h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <h3>
            <button
              type="button"
              className="CurrentUser__title button"
              onClick={onClear}
            >
              Clear
            </button>
          </h3>
        </>
      )}
    </div>
  );
};
