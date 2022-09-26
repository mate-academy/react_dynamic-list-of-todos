/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number;
  setSelectedUserId: (x: number) => void;
};

type State = {
  name: string,
  email: string,
  phone: string,
};

export const CurrentUser: React.FC<Props> = ({ userId, setSelectedUserId }) => {
  const [user, setUser] = useState<State | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(fetchedUser => setUser(fetchedUser))
      .catch(e => console.log(`Problem ${e}`));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>

      <h3
        className="CurrentUser__name"
        data-cy="userName"
      >
        {user?.name}
      </h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        className="CurrentUser__clear button"
        type="button"
        onClick={() => setSelectedUserId(0)}
      >
        Clear
      </button>
    </div>
  );
};
