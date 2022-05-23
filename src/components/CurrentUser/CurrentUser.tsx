import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { GetEndpoint } from '../../api';

type Props = {
  userId: number;
  resetUserId: (userId: number) => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, resetUserId }) => {
  const [user, setUser] = useState<User>({ name: '', email: '', phone: '' });

  const getUserInfo = async () => {
    const userInfo = await GetEndpoint(`users/${userId}`);

    setUser(userInfo);
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <button
          className="CurrentUser__button button"
          type="button"
          onClick={() => resetUserId(0)}
        >
          Reset Users
        </button>
        <span>
          Selected user:
          {' '}
          {userId}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
