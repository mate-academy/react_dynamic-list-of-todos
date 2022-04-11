import React, { useCallback, useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

interface Props {
  userId: number;
  clear: (userId: number) => void;
}

export const CurrentUser: React.FC<Props> = React.memo(({ userId, clear }) => {
  const [user, setUser] = useState<User | null>(null);
  const reset = useCallback(() => setUser(null), []);

  useEffect(() => {
    reset();

    getUser(userId)
      .then((userData) => setUser(userData));
  }, [userId]);

  return (
    user ? (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button type="button" onClick={() => clear(0)}>clear</button>
      </div>
    ) : <span>no user</span>
  );
});
