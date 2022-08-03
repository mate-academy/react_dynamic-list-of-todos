import React, { useState, useEffect, useCallback } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

interface Props {
  userId: number;
  clearUser: (arg0: number | null) => void,
}

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [user, setUser] = useState<User | null>();

  const loadUser = useCallback(
    async () => {
      try {
        const loadedUser = await getUser(userId);

        if (loadedUser) {
          setUser(loadedUser);
        }
      } catch {
        setUser(null);
      }
    },
    [userId],
  );

  useEffect(() => {
    loadUser();
  }, [userId]);

  return user
    ? (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
        <button
          className="
          TodoList__user-button
          TodoList__user-button--selected
          button
          "
          type="button"
          onClick={() => {
            clearUser(null);
          }}
        >
          Clear
        </button>
      </>
    )
    : (<h1>something went horribly wrong</h1>);
};
