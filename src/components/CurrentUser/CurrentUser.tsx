import React, { useState, useEffect } from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  onClear: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, onClear }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(setUser);
  }, [userId]);

  return user && (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
      <button
        type="button"
        onClick={() => onClear(0)}
      >
        Clear
      </button>
    </div>
  );
};
