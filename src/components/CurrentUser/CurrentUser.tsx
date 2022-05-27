import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  selectUserId: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, selectUserId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userFromServer = async () => {
      setUser(await getUser(userId));
    };

    userFromServer();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>

      <h3 data-cy="userName" className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
      <button
        onClick={() => {
          selectUserId(0);
        }}
        type="button"
        className="CurrentUser__clear button"
      >
        Clear
      </button>
    </div>
  );
};
