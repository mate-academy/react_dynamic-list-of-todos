import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { requestUser } from '../../api';
import { User } from '../../react-app-env';

type Props = {
  selectedUserId: number
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    requestUser(selectedUserId)
      .then(userFromServer => setUser(userFromServer));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {user
        ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                { selectedUserId }
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

            <button
              type="button"
              className="button"
              onClick={() => {
                setUser(null);
              }}
            >
              Clear
            </button>
          </>

        )
        : 'User is not found'}

    </div>
  );
};
