import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api/api';

type Props = {
  userId: number,
  setSelectedUserId: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({
  userId,
  setSelectedUserId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function response() {
      try {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
      } catch {
        setUser(null);
        setErrorMessage('Cant load user from server');
      }
    }

    response();
  }, [userId]);

  return (
    <div>
      {user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user?.id}`}
            </span>
          </h2>

          <h3
            data-cy="userName"
            className="CurrentUser__name"
          >
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
            className="button CurrentUser__clear"
            onClick={() => setSelectedUserId(0)}
          >
            Clear User
          </button>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};
