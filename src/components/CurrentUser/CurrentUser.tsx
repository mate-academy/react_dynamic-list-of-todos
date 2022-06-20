import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

type Props = {
  userId: number;
  setUseId: (id: number) => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, setUseId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState('');

  useEffect(() => {
    getUser(userId)
      .then(response => setUser(response))
      .catch(() => setUserError('No user'));
  }, [userId]);

  if (!user) {
    return (<b>{userError}</b>);
  }

  return (
    <>
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user?.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name" data-cy="userName">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
      </div>
      <button
        type="button"
        onClick={() => setUseId(0)}
      >
        Clear
      </button>
    </>
  );
};
