import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api/api';

type Props = {
  userId: number,
};

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(setUser);
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {' '}
          {user?.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
    </div>
  );
};
