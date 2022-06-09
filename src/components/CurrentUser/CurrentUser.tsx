import React, { useState, useEffect } from 'react';
import { getSelectedUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  clearUser: CallableFunction,
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId, clearUser }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getSelectedUser(selectedUserId).then(data => setUser(data));
  }, [selectedUserId]);

  return (
    <>
      {user
        ? (
          <>
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>{`Selected user: ${selectedUserId}`}</span>
              </h2>

              <h3
                className="CurrentUser__name"
                data-cy="userName"
              >
                {user?.name}
              </h3>
              <p className="CurrentUser__email">{user?.email}</p>
              <p className="CurrentUser__phone">{user?.phone}</p>
            </div>

            <button
              type="button"
              onClick={() => clearUser()}
              className="CurrentUser__clear button"
            >
              Clear
            </button>
          </>
        )
        : <h3>No user data</h3>}
    </>
  );
};
