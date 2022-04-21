import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api';

type Props = {
  userId: number;
  clearUser: () => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);

  useEffect(() => {
    getUsers(userId)
      .then((res) => {
        setCurrentUserData(res);
      });
  }, [userId]);

  if (currentUserData !== null) {
    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {userId}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{currentUserData.name}</h3>
        <p className="CurrentUser__email">{currentUserData.email}</p>
        <p className="CurrentUser__phone">{currentUserData.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={clearUser}
        >
          Clear
        </button>
      </div>
    );
  }

  return (
    <b>User not found</b>
  );
};
