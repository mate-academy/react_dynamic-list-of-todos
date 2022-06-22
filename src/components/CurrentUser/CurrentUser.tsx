import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number;
  clearUser: () => void;
};

type User = {
  id: number;
  name: string;
  username?: string;
  email: string;
  phone: string;
  website?: string;
} | null;

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [user, setUser] = useState<User>(null);
  const [errorMess, setErrorMess] = useState<string>('');

  useEffect(() => {
    getUser(userId)
      .then((userFromServer) => setUser(userFromServer))
      .catch((error) => {
        setUser(null);
        setErrorMess(`ERROR: Can't find user with id #${userId}!
          <${error}>`);
      });
  }, [userId]);

  return (
    <>
      {user
        ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name" data-cy="userName">
              {user.name}
            </h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="button CurrentUser__button-clear"
              onClick={() => {
                clearUser();
                setUser(null);
              }}
            >
              Clear
            </button>
          </div>
        ) : (
          <div>{errorMess && errorMess}</div>
        )}
    </>
  );
};
