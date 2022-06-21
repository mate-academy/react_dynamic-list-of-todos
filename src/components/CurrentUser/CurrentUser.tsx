import React, { useEffect, useState } from 'react';
import { findeUsers } from '../../api/api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number
  selectUser: (userId: number) => void,
}

export const CurrentUser: React.FC<Props> = (
  {
    selectedUserId,
    selectUser,
  },
) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    findeUsers(selectedUserId)
      .then(setUser);
  }, [selectedUserId]);

  return (
    <>
      {user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
      ) : 'Plaece wait, user information is loading'}
      <button
        type="button"
        onClick={() => {
          selectUser(0);
        }}
      >
        Clear
      </button>
    </>
  );
};
