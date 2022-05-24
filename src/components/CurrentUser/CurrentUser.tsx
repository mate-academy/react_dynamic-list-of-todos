import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../api/api';

type Props = {
  userId: number;
  clear: (id: number) => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, clear }) => {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    getUser(userId)
      .then(newUser => setUser(newUser));
  }, [userId]);

  return (
    <>
      {user && (
        <>
          <div className="CurrentUser">

            <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

            <h3 className="CurrentUser__name" data-cy="userName">
              {user.name}
            </h3>
            <p className="CurrentUser__email">
              {user.email}
            </p>
            <p className="CurrentUser__phone">
              {user.phone}
            </p>
          </div>

          <button
            type="button"
            className="CurrentUser__clear"
            onClick={() => clear(0)}
          >
            Clear User
          </button>
        </>
      )}
    </>
  );
};
