import React, { useEffect, useState } from 'react';
import { getUser } from '../../Api/api';
import './CurrentUser.scss';

type Props = {
  userId: number;
  removeUser: () => void;
};

export const CurrentUser: React.FC<Props> = React.memo(
  ({ userId, removeUser }) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
      getUser(userId)
        .then(person => setUser(person));
    }, [userId]);

    return (
      <div className="CurrentUser">
        {user ? (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.website}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="button CurrentUser__clear"
              onClick={removeUser}
            >
              Clear
            </button>
          </>
        ) : (
          <h2 className="CurrentUser__title">
            <span>
              Waiting for user...
            </span>
          </h2>
        )}

      </div>
    );
  },
);
