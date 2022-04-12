import React, {
  useEffect, useState, memo, useCallback,
} from 'react';
import { getUserById } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  onClear: () => void,
};

export const CurrentUser: React.FC<Props> = memo(({ userId, onClear }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clear = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  useEffect(() => {
    clear();

    getUserById(userId)
      .then(data => setUser(data))
      .catch(err => setError(err.message));
  }, [userId]);

  return (
    user ? (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          onClick={onClear}
          className="button CurrentUser__button CurrentUser___lear"
          type="button"
        >
          Clear
        </button>
      </div>
    ) : (
      <p>{error ? 'Error' : 'LOADING...'}</p>
    )
  );
});
