import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  selectedUser: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, selectedUser }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [hasLoadingError, setLoadingError] = useState(false);

  useEffect(() => {
    getUser(userId)
      .then(response => setUser(response))
      .then(() => setLoading(true))
      .catch(() => setLoadingError(true));
  }, [userId]);

  return (
    <>
      {!isLoading && (
        <p>Loading...</p>
      )}

      {(isLoading && hasLoadingError) && (
        <p>Failed loading data</p>
      )}

      {(isLoading && !hasLoadingError) && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {user?.id}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          <button
            type="button"
            onClick={() => selectedUser(0)}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
