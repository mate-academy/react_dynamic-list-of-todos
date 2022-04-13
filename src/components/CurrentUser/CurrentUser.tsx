import React, {
  Dispatch, memo, SetStateAction,
  useEffect, useState,
} from 'react';

import './CurrentUser.scss';

import { getUser } from '../../API/api';

interface Props {
  selectedUserId: number,
  setSelectedUserId: Dispatch<SetStateAction<number>>,
}

export const CurrentUser: React.FC<Props> = memo(({
  selectedUserId,
  setSelectedUserId,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedUserId)
      .then(loadedUser => setUser(loadedUser));
  }, [selectedUserId, setSelectedUserId]);

  return (
    <>
      {user === null
        ? 'User is loading'
        : (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user: ${user?.id}`}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user?.name}</h3>

            <p className="CurrentUser__email">{user?.email}</p>

            <p className="CurrentUser__phone">{user?.phone}</p>

            <button
              className="
          CurrentUser__clear
          button
        "
              type="button"
              onClick={() => setSelectedUserId(0)}
            >
              Clear
            </button>
          </div>
        )}
    </>
  );
});
