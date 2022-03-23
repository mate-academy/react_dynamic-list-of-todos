import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  userId: number,
  selectingUser: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({
  userId,
  selectingUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(response => setUser(response));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {userId}
        </span>
      </h2>
      <h3 className="CurrentUser__name">
        {user?.name}
      </h3>
      <p className="CurrentUser__email">
        {user?.email}
      </p>
      <p className="CurrentUser__phone">
        {user?.phone}
      </p>
      <button
        type="button"
        onClick={() => {
          selectingUser(0);
        }}
      >
        CLEAR
      </button>
    </div>
  );
};
