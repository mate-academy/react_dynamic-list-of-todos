import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  selectedUser: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({
  userId,
  selectedUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:&nbsp;
              {userId}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            className="CurrentUser__clear button"
            onClick={() => selectedUser(0)}
          >
            Clear
          </button>
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};
