import React, { useState, useEffect, useCallback } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number,
  clearUser: () => void;
};

export const CurrentUser: React.FC<Props> = ({
  clearUser,
  userId,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [errorLoad, setErrorLoad] = useState<boolean | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const newUser = await getUser(userId);

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
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            {`Selected user: ${currentUser.id}`}
          </h2>
          <h3 className="CurrentUser__name">{currentUser.name}</h3>
          <p className="CurrentUser__email">{currentUser.email}</p>
          <p className="CurrentUser__phone">{currentUser.phone}</p>

          <button
            className="CurrentUser__clear"
            type="button"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      )}

      {errorLoad && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            Please, try again!
          </h2>
        </div>
      )}
    </>
  );
};
