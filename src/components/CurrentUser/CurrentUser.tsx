import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUserDetail } from '../../api/api';

type Props = {
  userId: number,
  setSelectedUserId: (id: number) => void
};

export const CurrentUser: React.FC<Props> = ({ userId, setSelectedUserId }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUserDetail(userId).then(userFromServer => setUser(userFromServer));
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user
        && (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {' '}
                {user.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              className="button"
              style={{ float: 'right' }}
              onClick={() => setSelectedUserId(0)}
            >
              Clear
            </button>
          </>
        )}
    </div>
  );
};
