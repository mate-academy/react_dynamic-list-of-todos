import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api/api';

interface Props {
  user: number,
  clearUser: () => void
}

export const CurrentUser: React.FC<Props> = React.memo(
  ({ user, clearUser }) => {
    const [newUser, setNewUser] = useState<User | null>();

    useEffect(() => {
      getUsers(user)
        .then(person => setNewUser(person));
    }, [user]);

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {newUser?.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{newUser?.name}</h3>
        <p className="CurrentUser__email">{newUser?.email}</p>
        <p
          className="CurrentUser__phone"
        >
          {newUser?.phone}
        </p>
        <button
          type="button"
          onClick={clearUser}
        >
          Clear user

        </button>
      </div>
    );
  },
);
