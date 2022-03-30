import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  selectedUser: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, selectedUser }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    getUser(userId)
      .then(response => setUser(response))
      .then(() => setLoading(true))
      .catch(() => setLoadingError(true));
  }, [userId]);

  return (
    <>
      {!loading && (
        <p>Please wait, loading</p>
      )}

      {(loading && loadingError) && (
        <p>Failed to load</p>
      )}

      {(loading && !loadingError) && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Current user: ${user?.id}`}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          <button
            type="button"
            onClick={() => selectedUser(0)}
          >
            Unselect
          </button>
        </div>
      )}
    </>
  );
};
