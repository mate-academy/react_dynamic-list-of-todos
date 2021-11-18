import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number | null,
  clearUser: () => void,
};

export const CurrentUser: React.FC<Props> = ({
  userId, clearUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(data => setUser(data));
  }, [userId]);

  return (
    <>
      {user && (
        <div className="CurrentUser">
          <button
            type="button"
            className="CurrentUser__clear"
            onClick={clearUser}
          >
            <h2 className="CurrentUser__title">
              {`Clear Selected user: ${user.id}`}
            </h2>
          </button>

          <h3 className="CurrentUser__name">
            {user.name}
          </h3>
          <p className="CurrentUser__email">
            {user.email}
          </p>
          <p className="CurrentUser__phone">
            {user.phone}
          </p>
        </div>
      )}
    </>
  );
};
