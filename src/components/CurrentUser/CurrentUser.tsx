import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
};

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User>();
  // i can't add "null" into useState brackets because of error

  useEffect(() => {
    getUser(userId)
      .then(userFromServer => setUser(userFromServer));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`User: ${user?.id}`}</span></h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
    </div>
  );
};
