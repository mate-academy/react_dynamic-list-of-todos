import React, { useEffect, useState } from 'react';
import { loadUser } from '../../api/api';
import './CurrentUser.scss';

interface Props {
  userId: number;
  onUserClear: () => void;
}

export const CurrentUser: React.FC<Props> = (props) => {
  const { userId, onUserClear } = props;
  const [user, setUser] = useState<User | null>(null);

  const reloadUser = async () => {
    const loadingUser: User | null = await loadUser(userId);

    setUser(loadingUser);
  };

  useEffect(() => {
    reloadUser();
  }, []);

  useEffect(() => {
    reloadUser();
  }, [userId]);

  if (!user) {
    return (
      <p>User not found</p>
    );
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {` ${user.name}`}
        </span>
        <button
          type="button"
          className="button"
          onClick={onUserClear}
        >
          Clear
        </button>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
