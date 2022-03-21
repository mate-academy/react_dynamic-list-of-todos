import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
};

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    getUser(userId)
      .then(userFromServer => setUser(userFromServer))
      .then(() => setLoading(true));
  }, [userId]);

  return (
    <div>
      {loading ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`User: ${user?.id}`}</span></h2>
          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
        </div>
      )
        : (
          <p>In process...</p>
        )}
    </div>
  );
};
