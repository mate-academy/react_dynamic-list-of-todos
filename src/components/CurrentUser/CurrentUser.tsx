import React, { useState, useCallback, useEffect } from 'react';
import './CurrentUser.scss';

import { getUsers } from '../../api/api';

type Props = {
  userId: number;
  clearUser: () => void;
};

export const CurrentUser: React.FC<Props> = ({
  userId,
  clearUser,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [errorLoad, setErrorLoad] = useState<boolean | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const newUser = await getUsers(userId);

      setCurrentUser(newUser);
      setErrorLoad(null);
    } catch {
      setCurrentUser(null);
      setErrorLoad(true);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <>
      {currentUser && (
        <div className="currentUser">
          <h2 className="currentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>

          <h3 className="currentUser__name">
            {currentUser.name}
          </h3>

          <p className="currentUser__email">
            {currentUser.email}
          </p>

          <button
            type="button"
            className="currentUser__clear"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      )}

      {errorLoad && (
        <div className="currentUser">
          <span>
            <h2 className="currentUser__title">Opps! try again please</h2>
          </span>
        </div>
      )}
    </>
  );
};
