import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';
import { User } from '../../react-app-env';

type Props = {
  userId: number,
  clear: (id: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, clear }) => {
  const [currentUser, setUser] = useState<User | null>(null);

  const getUsersDetails = useCallback(async () => {
    const usersDetails = await getUser(userId);

    setUser(usersDetails);
  }, [userId]);

  useEffect(() => {
    getUsersDetails();
  }, [userId]);

  return (
    <>
      { currentUser && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>
          <h3
            className="CurrentUser__name"
            data-cy="userName"
          >
            {currentUser.name}
          </h3>

          <p className="CurrentUser__email">
            {currentUser.email}
          </p>

          <p className="CurrentUser__phone">
            {currentUser.phone}
          </p>

          <button
            type="button"
            className="CurrentUser__button"
            onClick={() => clear(0)}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
