import React, { useState, useCallback, useEffect } from 'react';
import { User } from '../../react-app-env';
import { getUsers } from '../../api/api';

import './CurrentUser.scss';

type Props = {
  userId: number,
  onRemoveUser: () => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, onRemoveUser }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async () => {
    const newUser = await getUsers(userId);

    setUser(newUser);
  }, [userId]);

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Current user: ${user?.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name" data-cy="userName">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.username}</p>
      <p className="CurrentUser__phone">{user?.email}</p>
      {user && (
        <button
          className="CurrentUser__clear button"
          type="button"
          onClick={onRemoveUser}
        >
          Remove
        </button>
      )}
    </div>
  );
};
