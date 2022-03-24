/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api';

import { User } from '../../react-app-env';

type ICurerntUser = {
  userId: number,
};

export const CurrentUser: React.FC<ICurerntUser> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasUserErrorFromServer, setHasUserErrorFromServer] = useState(false);

  useEffect(() => {
    getUser(userId)
      .then((newUser: User) => setUser(newUser))
      .catch(() => setHasUserErrorFromServer(true));
  }, [userId]);

  return (
    <div className="CurrentUser">
      {!hasUserErrorFromServer ? (
        user?.id !== userId ? (<h2>Loading...</h2>) : (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>

            <h3 className="CurrentUser__name">{user?.name}</h3>
            <p className="CurrentUser__email">{user?.email}</p>
            <p className="CurrentUser__phone">{user?.phone}</p>
          </>
        )
      ) : (
        <h2>Can`t load data</h2>
      )}
    </div>
  );
};
