import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  clearUser: () => void;
};

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  clearUser,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [errorLoad, setErrorLoad] = useState(false);

  const getCurrentUser = useCallback(async () => {
    try {
      const user = await getUser(selectedUserId);

      setCurrentUser(user);
      setErrorLoad(false);
    } catch {
      setErrorLoad(true);
      setCurrentUser(null);
    }
  }, [selectedUserId]);

  useEffect(() => {
    getCurrentUser();
  }, [selectedUserId]);

  return (
    <>
      {currentUser && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`Selected user: ${currentUser.id}`}</span></h2>

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
        <div>Can&apos;t load user, please try later.</div>
      )}
    </>
  );
};
