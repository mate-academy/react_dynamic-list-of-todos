import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number;
  selectUser: (id: number) => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, selectUser }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(newUser => setUser(newUser));
  }, [userId]);

  return (
    <>
      {user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user.id}`}</span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
      )}
      <button
        type="button"
        onClick={() => selectUser(0)}
        className="CurrentUser__clear"
      >
        Clear
      </button>
    </>
  );
};
