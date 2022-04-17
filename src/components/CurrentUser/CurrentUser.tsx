import React, { useEffect, useState } from 'react';
import { getUser } from '../api';
import './CurrentUser.scss';

type Props = {
  userId: number
  clearId: (n: number) => void
};

export const CurrentUser: React.FC<Props> = ({ userId, clearId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(response => setUser(response));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected User:&nbsp;
          {userId}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
      <button
        type="button"
        className="button is-info is-fullwidth mt-5"
        onClick={() => {
          clearId(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
