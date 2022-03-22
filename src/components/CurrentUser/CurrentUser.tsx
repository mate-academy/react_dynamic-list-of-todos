import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api';

import { User } from '../../react-app-env';

type ICurerntUser = {
  userId: number,
};

export const CurrentUser: React.FC<ICurerntUser> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then((newUser: User) => setUser(newUser));
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user?.id !== userId ? (<h2>Loading...</h2>) : (
        <>
          <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
        </>
      )}
    </div>
  );
};
