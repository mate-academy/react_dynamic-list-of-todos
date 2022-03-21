import React, { useEffect, useState } from 'react';
import { getUserById } from '../../api/api';
import { User } from '../../types/User';
import './CurrentUser.scss';

type Props = {
  userId: number
};

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function getUser() {
      const userFromServer = await getUserById(userId);

      setUser(userFromServer);
    }

    getUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        {`Selected user: ${user?.id}`}
      </h2>
      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__phone">{user?.phone}</p>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__website">{user?.website}</p>
    </div>
  );
};
