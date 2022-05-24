import { FC, useEffect, useState, useCallback } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number;
  clearUser: () => void;
};

export const CurrentUser: FC<Props> = ({
  userId,
  clearUser,
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
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
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
            className="CurrentUser__clear"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      )}

      {errorLoad && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Try again
            </span>
          </h2>
        </div>
      )}
    </>
  );
};
