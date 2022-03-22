import React, { useState, useEffect } from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  onClear: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, onClear }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasDataError, setHasDataError] = useState(false);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .then(() => setHasDataLoaded(true))
      .catch(() => {
        setHasDataError(true);
        setHasDataLoaded(true);
      });
  }, [userId]);

  return (
    <>
      {(!hasDataError && hasDataLoaded) && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          <button
            type="button"
            onClick={() => onClear(0)}
          >
            Clear
          </button>
        </div>
      )}

      <div>
        {(hasDataError && hasDataLoaded) && (
          <div>
            Unable to load the data
          </div>

        )}

        {!hasDataLoaded && (
          <div>
            Loading...
          </div>
        )}
      </div>
    </>
  );
};
