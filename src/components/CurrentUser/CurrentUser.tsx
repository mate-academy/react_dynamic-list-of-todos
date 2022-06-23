import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

interface Props {
  selectedUserId: number,
  onHandlerClear: (userId: number) => void,
}

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  onHandlerClear,
}) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    getUser(selectedUserId)
      .then(userFromServer => {
        setUser(userFromServer);
      })
      .catch(() => {
        setUser(null);
      });
  }, [selectedUserId]);

  return (
    <div className="CurrentUser text-center">
      {user
        ? (
          <>
            <h2 className="CurrentUser__title">
              <span>{user.id}</span>
            </h2>

            <h3
              className="CurrentUser__name"
              data-cy="userName"
            >
              {user.name}
            </h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </>
        )
        : (
          'User is not found'
        )}
      <button
        className="btn btn-danger"
        data-cy="userButton"
        type="button"
        onClick={() => {
          onHandlerClear(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
