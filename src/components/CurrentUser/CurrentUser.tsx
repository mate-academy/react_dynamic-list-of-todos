import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';
import { User } from '../../react-app-env';

type Props = {
  userId: number,
  onSelect: (userId: number) => void
};

export const CurrentUser: React.FC<Props> = ({ userId, onSelect }) => {
  const [user, setUser] = useState<User | null>(null);

  const requestUser = async () => {
    try {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    } catch {
      // eslint-disable-next-line no-console
      console.log('User is not found');
    }
  };

  useEffect(() => {
    requestUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user?.id}`}</span>
      </h2>

      <button
        type="button"
        className="button"
        onClick={() => {
          onSelect(0);
        }}
      >
        Clear
      </button>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
    </div>
  );
};
