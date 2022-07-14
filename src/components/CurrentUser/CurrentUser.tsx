import React, { useEffect, useState } from 'react';
import { getUser } from '../../api\'s/api';
import './CurrentUser.scss';

type HandleSetSelectedUserId = (id: number) => void;

interface Props {
  handleSetSelectedUserId: HandleSetSelectedUserId;
  userId: number;
}

export const CurrentUser: React.FC<Props> = ({
  userId,
  handleSetSelectedUserId,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(userFromServer => {
        setUser(userFromServer);
      });
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user?.id
        ? (
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user?.id}`}</span>
          </h2>
        )
        : <h2>User was not found</h2>}

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        type="button"
        className="button"
        onClick={() => handleSetSelectedUserId(0)}
      >
        Clear
      </button>
    </div>
  );
};
