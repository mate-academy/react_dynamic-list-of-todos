import React, { useEffect, useState } from 'react';
import { getUser } from '../../apis/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  selectUser: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, selectUser }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(response => setUser(response));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <button
        type="button"
        onClick={() => selectUser(0)}
      >
        ClearUser
      </button>
      <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
    </div>
  );
};
