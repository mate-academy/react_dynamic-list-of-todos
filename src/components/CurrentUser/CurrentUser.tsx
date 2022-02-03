import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUsersById } from '../../api/todos';

type Props = {
  userId: number
};

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userFromServer = await getUsersById(userId);

      setUser(userFromServer);
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>

      {user && (
        <>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </>
      )}
    </div>
  );
};
