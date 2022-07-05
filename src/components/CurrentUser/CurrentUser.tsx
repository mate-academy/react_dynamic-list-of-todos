import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../helpers/api';
import './CurrentUser.scss';

interface Props {
  userId: number;
}

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = useCallback(
    async (userIdToLoad: number) => {
      const userInfo = await getUser(userIdToLoad);

      setUser(userInfo);
    },
    [],
  );

  useEffect(
    () => {
      loadUser(userId);

      return () => setUser(null);
    },
    [userId],
  );

  return (
    <>
      {user
        ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>
        )
        : (<p>User is loading...</p>)}
    </>
  );
};
